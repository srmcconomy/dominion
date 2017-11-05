import Pile from 'utils/Pile';
import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import Card from 'cards/Card';
import AsyncSocket from 'utils/AsyncSocket';

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

@DirtyModel
@EventEmitter
export default class Player extends Model {
  @trackDirty(hand => hand.size)
  hand = new Pile();

  @trackDirty(deck => deck.size)
  deck = new Pile();

  @trackDirty(pile => (pile.size > 0 ? pile.last().id : null))
  discardPile = new Pile();

  playArea = new Pile();

  @trackDirty
  name;

  @trackDirty
  index = null;

  @trackDirty
  actions = 1;

  @trackDirty
  money = 0;

  @trackDirty
  buys = 0;

  @trackDirty
  vpTokens = 0;

  game = null;

  socket = null;

  constructor(name, game, socket) {
    super();

    this.socket = new AsyncSocket(socket);
    this.socket.onReconnect(() => this.socket.emit('state', this.game));
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
    return card;
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
    return cards;
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
    card.onPlay(this);
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
      const res = await this.selectOptionOrCardsOrSupplies(['Play all treasures'], { min: 0, max: 1, predicate: c => c.types.has('Treasure'), from: 'hand' });
      if (res === 0) {
        let i = 0;
        while (i < this.hand.size) {
          const card = this.hand.get(i);
          if (card.types.has('Treasure')) {
            this.play(card);
          } else {
            i++;
          }
        }
      } else {
        const [card] = res;
        console.log('card selected:');
        console.log(card);
        if (!card) break;
        this.play(card);
      }
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

  setSocket(socket) {
    this.socket.setSocket(socket);
  }

  async getInputAndNotifyDirty(payload, validate) {
    console.log('get-input');
    const dirty = this.game.createDirty();
    console.log(dirty);
    await this.forEachOtherPlayer(player => {
      let newDirty = dirty;
      if (dirty.players && dirty.players[player.id] && dirty.players[player.id].hand) {
        newDirty = { ...dirty, hand: player.hand.toIDArray() };
      }
      player.socket.emit('get-input', { payload: { type: 'clear-input' }, dirty: newDirty });
    });
    if (dirty.players && dirty.players[this.id] && dirty.players[this.id].hand) {
      dirty.hand = this.hand.toIDArray();
    }
    this.game.clean();
    for (;;) {
      console.log('loop');
      const response = await this.socket.emitAndWait('get-input', {
        payload,
        dirty,
      });
      console.log('selected');
      console.log(response);
      if (validate(response)) return response;
    }
  }

  async selectOptionOrCardsOrSupplies(options, cardData, supplyData) {
    console.log('select-option-or-cards-or-supplies');
    const payload = {};
    if (options) {
      payload.selectOption = {
        options,
      };
    }
    let filteredCards = null;
    let filteredSupplies = null;
    if (cardData) {
      const { min, max, predicate, from } = cardData;
      filteredCards = predicate ? this[from].filter(predicate) : this[from];
      if (filteredCards.size === 0 && !supplyData && !options) {
        return { type: 'select-cards', cards: [] };
      }
      if (filteredCards.size > 0) {
        payload.selectCards = {
          min,
          max,
          cards: filteredCards.toIDArray(),
        };
      }
    }
    if (supplyData) {
      const { min, max, predicate } = supplyData;
      filteredSupplies = [...this.game.supplies.values()].filter(predicate);
      if (filteredSupplies.length === 0 && !options && !payload.selectCards) {
        return { type: 'select-supplies', supplies: [] };
      }
      if (filteredSupplies.length > 0) {
        payload.selectSupplies = {
          min,
          max,
          supplies: filteredSupplies.map(supply => supply.title),
        };
      }
    }
    console.log(payload);
    const { type, data } = await this.getInputAndNotifyDirty(payload, res => {
      console.log(res);
      switch (res.type) {
        case 'select-cards':
          return filteredCards && res.data.every(id => filteredCards.hasID(id));
        case 'select-supply':
          return filteredSupplies && res.data.every(name => filteredSupplies.some(supply => supply.title === name));
        case 'select-option':
          return res.data >= 0 && res.data < options.length;
        default:
          return false;
      }
    });
    switch (type) {
      case 'select-cards':
        return data.map(id => Model.fromID(id));
      case 'select-supply':
        return data.map(name => this.game.supplies.get(name));
      case 'select-option':
        return data;
      default:
        throw new Error('invalid');
    }
  }

  async selectOption(options) {
    console.log('select-option');
    return this.selectOptionOrCardsOrSupplies(options);
  }

  async selectCards(min, max, predicate, from = 'hand') {
    console.log('select-cards');
    return this.selectOptionOrCardsOrSupplies(null, { min, max, predicate, from });
  }

  async selectSupplies(min, max, predicate) {
    console.log('select-supplies');
    return this.selectOptionOrCardsOrSupplies(null, null, { min, max, predicate });
  }

  async revealHand() {
    await Promise.resolve(this);
  }
}
