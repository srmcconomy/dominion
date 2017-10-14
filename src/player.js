import { Map, List } from 'immutable';
import OrderedMap from './ordered-map';
import EventEmitter from './event-emitter';

export default class Player extends EventEmitter {
  constructor(name, socket) {
    super();
    this.hand = new Map();
    this.deck = new OrderedMap();
    this.discardPile = new OrderedMap();
    this.playArea = new OrderedMap();
    this.actions = 1;
    this.money = 0;
    this.buys = 0;
    this.vpTokens = 0;
    this.name = name;
    this.socket = socket;
  }

  async selectCards(min, max, predicate) {
    return new Promise(resolve => {
      this.once('cards-selected', cards => resolve(cards));
      this.socket.emit({ type: 'select-cards', min, max, cards: this.hand.filter(predicate).map((_, key) => key) });
    });
  }

  async selectSupplies(min, max, predicate) {
    return new Promise(resolve => {
      this.once('supplies-selected', supplies => resolve(supplies));
      this.emit('select-supplies', this, min, max, predicate);
    })
  }

  moveCard(card, )

  trash(card, from = 'hand') {
    this.emit('before-trash', card);
    card.onTrash(this);
    switch (from) {
      default:
      case 'hand':
        this.hand = this.hand.delete(card.id);
    }
    this.game.trash = this.game.trash.set(card.id, card);
    this.emit('after-trash', card);
  }

  discard(card) {
    this.emit('before-discard', card);
    card.onDiscard(this);
    this.hand = this.hand.delete(card.id);
    this.discardPile = this.discardPile.push(card.id, card);
    this.emit('after-discard', card);
  }

  gain(name, whereTo = 'discard') {
    this.emit('before-gain');
    const card = this.game.supplies.get(name).last();
    this.game.supplies.update(name, supply => supply.pop());
    card.onGain(this);
    switch (whereTo) {
      default:
      case 'discard':
        this.discardPile = this.discardPile.push(card.id, card);
        break;
      case 'hand':
        this.hand = this.hand.set(card.id, card);
        break;
      case 'topdeck':
        this.deck = this.deck.push(card.id, card);
        break;
    }
    this.emit('after-gain');
  }

  draw(num) {
    this.emit('before-draw');
    const actions = [];
    let cards = new Map();
    let numTaken = 0;
    if (this.deck.size < num) {
      if (this.deck.size > 0) {
        numTaken = this.deck.size;
        cards = deck.toMap();
      }
      if (this.discardPile.size > 0) {
        this.deck = this.discardPile.shuffle();
        this.discardPile = this.discardPile.clear();
        actions.push({ type: 'deck-set-size', size: this.deck.size }, { type: 'discard-set-top', card: null });
      } else {
        actions.push({ type: 'deck-set-size', size: 0 });
      }
    }
    if (this.deck.size > 0) {
      cards = cards.merge(this.deck.takeLast(num - numTaken).toMap());
      this.deck = this.deck.take(this.deck.size - num + numTaken);
      this.hand = this.hand.merge(cards.toMap());
      cards.forEach(card => card.onDraw(this));
    }
    this.emit('after-draw', cards);
  }

  topdeck(card, from = 'hand') {
    switch (from) {
      default:
      case 'hand':
        this.hand = this.hand.delete(card.id);
    }
    this.deck = this.deck.push(card.id, card);
  }

  discardHand() {
    const cards = this.hand.toList();
    cards.forEach(card => {
      card.onDiscard();
    });
    this.hand = this.hand.clear();
    cards.forEach(card => {
      this.discardPile.push(card.id, card);
    });
  }

  play(card) {
    this.emit('before-play');
    this.hand = this.hand.delete(card.id);
    this.playArea = this.playArea.push(card.id, card);
    card.onPlay();
    this.emit('after-play', card);
  }

  async forEachOtherPlayer(func) {
    for (let i = this.index + 1; i !== this.index; i = i === this.game.players.size - 1 ? 0 : i + 1) {
      await func(this.game.players[i]);
    }
  }

  async revealHand() {
    return new Promise(resolve => {
      EventQueue.once('hand-revealed', () => resolve())
      EventQueue.emit('reveal-hand', this, hand);
    })
  }

  async takeTurn() {
    this.actions = 1;
    this.buys = 1;
    this.money = 0;
    while (this.actions > 0) {
      const [card] = await this.selectCards(0, 1, card => card.types.has('Action'));
      if (!card) break;
      this.hand = this.hand.delete(card.id);
      this.playArea = this.playArea.push(card.id, card);
      card.onPlay();
    }
    while (this.hand.some(card => card.types.has('Treasure'))) {
      const [card] = await this.selectCards(0, 1, card => card.types.has('Treasure'));
      if (!card) break;
      this.hand = this.hand.delete(card.id);
      this.playArea = this.playArea.push(card.id, card);
      this.money += card.value;
      card.onPlay();
    }
    while (this.buys > 0) {
      let [supplyName] = await this.selectSupplies(0, 1, supply => supply.size > 0 && supply.last().cost <= this.money);
      if (!supplyName) break;
      this.gain(supplyName);
      this.buys--;
    }
    this.discardHand();
    this.draw(5);
  }
}
