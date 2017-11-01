import { readonly, nonenumerable } from 'core-decorators';

import Pile from 'utils/Pile';
import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import Card from 'cards/Card';
import PlayerIO from './PlayerIO';

function moveCard(card, fromPile, toPile, options) {
  if (card instanceof Pile) {
    options = toPile;
    toPile = fromPile;
    fromPile = card;
    card = null;
  }
  const { fromWhere, toWhere, num } = {
    fromWhere: 'top',
    toWhere: 'top',
    num: 1,
    ...options,
  };
  let cards;
  if (!card) {
    switch (fromWhere) {
      default:
      case 'top':
        cards = fromPile.spliceLast(num);
        break;
      case 'bottom':
        cards = fromPile.spliceFirst(num);
        break;
    }
  } else {
    cards = [card];
    fromPile.delete(card);
  }
  switch (toWhere) {
    default:
    case 'top':
      toPile.push(...cards);
      break;
    case 'bottom':
      toPile.unshift(...cards);
      break;
  }
  return cards;
}

@PlayerIO
@EventEmitter
export default class Player extends Model {
  @readonly
  hand = new Pile();

  @readonly
  deck = new Pile();

  @readonly
  discardPile = new Pile();

  @readonly
  @nonenumerable
  playArea = new Pile();

  name;
  index = null;
  actions = 1;
  money = 0;
  buys = 0;
  vpTokens = 0;

  @nonenumerable
  game = null;

  constructor(name, game) {
    super();
    this.game = game;
    game.players.set(this.id, this);
    this.actions = 1;
    this.money = 0;
    this.buys = 0;
    this.vpTokens = 0;
    this.name = name;
  }

  setIndex(index) {
    this.index = index;
  }

  trash(card, from = 'hand') {
    this.emit('before-trash', card);
    card.onTrash(this);
    moveCard(card, this[from], this.game.trash);
    this.emit('after-trash', card);
  }

  discard(card, from = 'hand') {
    this.emit('before-discard', card);
    card.onDiscard(this);
    moveCard(card, this[from], this.discardPile);
    this.emit('after-discard', card);
  }

  gain(name, to = 'discardPile') {
    this.emit('before-gain');
    const [card] = moveCard(this.game.supplies.get(name).cards, this[to]);
    card.onGain(this);
    this.emit('after-gain');
  }

  draw(num) {
    this.emit('before-draw');
    const cards = new Pile();
    let numTaken = 0;
    if (this.deck.size < num) {
      if (this.deck.size > 0) {
        numTaken = this.deck.size;
        moveCard(this.deck, cards, { num: numTaken });
      }
      if (this.discardPile.size > 0) {
        moveCard(this.discardPile, this.deck, { num: this.discardPile.size });
        this.deck.shuffle();
      }
    }
    if (this.deck.size > 0) {
      moveCard(this.deck, cards, { num: Math.min(num - numTaken, this.deck.size) });
      this.hand.push(...cards);
      cards.forEach(card => card.onDraw(this));
    }
    this.emit('after-draw', cards);
  }

  topdeck(card, from = 'hand') {
    moveCard(card, this[from], this.deck);
  }

  cleanup() {
    this.hand.forEach(card => {
      card.onDiscard();
    });
    this.playArea.forEach(card => {
      card.onDiscard();
    });
    moveCard(this.hand, this.discardPile, { num: this.hand.size });
    moveCard(this.playArea, this.discardPile, { num: this.playArea.size });
  }

  play(card) {
    this.emit('before-play');
    card.onPlay();
    moveCard(card, this.hand, this.playArea);
    this.emit('after-play', card);
  }

  async forEachOtherPlayer(func) {
    if (this.game.playerOrder.length <= 1) return;
    for (let i = this.index === this.game.playerOrder.length - 1 ? 0 : this.index + 1; i !== this.index; i = i === this.game.playerOrder.length - 1 ? 0 : i + 1) {
      await func(this.game.playerOrder[i]);
    }
  }

  async takeTurn() {
    console.log('turn start');
    console.log(this);
    this.actions = 1;
    this.buys = 1;
    this.money = 0;
    while (this.actions > 0 && this.hand.some(card => card.types.has('Action'))) {
      const [card] = await this.selectCards(0, 1, c => {
        c.types.has('Action');
      });
      if (!card) break;
      this.play(card);
    }
    while (this.hand.some(card => card.types.has('Treasure'))) {
      console.log('ask for cards');
      const [card] = await this.selectCards(0, 1, c => c.types.has('Treasure'));
      console.log('card selected:');
      console.log(card);
      if (!card) break;
      this.money += card.value;
      this.play(card);
    }
    while (this.buys > 0) {
      console.log('ask for supplies');
      const [supply] = await this.selectSupplies(0, 1, s => s.cards.size > 0 && Card.classes.get(s.title).cost <= this.money);
      console.log('card selected:');
      console.log(supply);
      if (!supply) break;
      this.gain(supply.title);
      this.money -= Card.classes.get(supply.title).cost;
      this.buys--;
    }
    this.cleanup();
    this.draw(5);
  }
}
