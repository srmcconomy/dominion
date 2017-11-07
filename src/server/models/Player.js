import Pile from 'utils/Pile';
import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import Card from 'cards/Card';
import AsyncSocket from 'utils/AsyncSocket';

@DirtyModel
@EventEmitter
export default class Player extends Model {
  @trackDirty(hand => hand.size)
  hand = new Pile();

  @trackDirty(deck => deck.size)
  deck = new Pile();

  @trackDirty(pile => (pile.size > 0 ? pile.last().id : null))
  discardPile = new Pile();

  @trackDirty(pile => (pile.size > 0 ? pile.last().id : null))
  aside = new Pile();

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

  moveCard(card, fromPile, toPile, options) {
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

  async trash(card, from = 'hand') {
    this.emit('before-trash', card);
    this.moveCard(card, this[from], this.game.trash);
    await card.onTrash(this);
    this.emit('after-trash', card);
  }

  async discard(card, from = 'hand') {
    this.emit('before-discard', card);
    this.moveCard(card, this[from], this.discardPile);
    await card.onDiscard(this);
    this.emit('after-discard', card);
  }

  async gain(name, to = 'discardPile') {
    this.emit('before-gain');
    const [card] = this.moveCard(this.game.supplies.get(name).cards, this[to]);
    await card.onGain(this);
    this.emit('after-gain');
    return card;
  }

  async draw(num, to) {
    this.emit('before-draw');
    const cards = new Pile();
    let numTaken = 0;
    if (this.deck.size < num) {
      if (this.deck.size > 0) {
        numTaken = this.deck.size;
        this.moveCard(this.deck, cards, { num: numTaken });
      }
      if (this.discardPile.size > 0) {
        this.moveCard(this.discardPile, this.deck, { num: this.discardPile.size });
        this.deck.shuffle();
      }
    }
    if (this.deck.size > 0) {
      this.moveCard(this.deck, cards, { num: Math.min(num - numTaken, this.deck.size) });
      for (let i = 0; i < cards.length; i++) {
        const card = cards.get(i);
        let whereTo = typeof to === 'function' ? await to(card) : to;
        if (!whereTo) whereTo = this.hand;
        whereTo.push(card);
        await card.onDraw(this);
      }
    }
    this.emit('after-draw', cards);
    return cards;
  }

  topDeck(card, from = 'hand') {
    this.moveCard(card, this[from], this.deck);
  }

  async cleanup() {
    this.moveCard(this.hand, this.discardPile, { num: this.hand.size });
    this.moveCard(this.playArea, this.discardPile, { num: this.playArea.size });
    await this.hand.asyncForEach(card => card.onDiscard());
    await this.playArea.asyncForEach(card => card.onDiscard());
  }

  async play(card) {
    this.emit('before-play');
    this.moveCard(card, this.hand, this.playArea);
    await card.onPlay(this);
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
      const [card] = await this.selectCards({ min: 0, max: 1, predicate: c => c.types.has('Action') });
      if (!card) break;
      this.actions--;
      await this.play(card);
    }
    while (this.hand.some(card => card.types.has('Treasure'))) {
      console.log('ask for cards');
      const res = await this.selectOptionOrCardsOrSupplies(['Play all treasures'], { min: 0, max: 1, predicate: c => c.types.has('Treasure'), from: 'hand' });
      if (res === 0) {
        let i = 0;
        while (i < this.hand.size) {
          const card = this.hand.get(i);
          if (card.types.has('Treasure')) {
            await this.play(card);
          } else {
            i++;
          }
        }
      } else {
        const [card] = res;
        console.log('card selected:');
        console.log(card);
        if (!card) break;
        await this.play(card);
      }
    }
    while (this.buys > 0) {
      console.log('ask for supplies');
      const res = await this.selectOptionOrCardsOrSupplies(
        ['End turn'],
        null,
        {
          min: 0,
          max: 1,
          predicate: s => s.cards.size > 0 && Card.classes.get(s.title).cost <= this.money
        }
      );
      if (res === 0) {
        break;
      }
      const [supply] = res;
      console.log('card selected:');
      console.log(supply);
      if (!supply) break;
      this.gain(supply.title);
      this.money -= Card.classes.get(supply.title).cost;
      this.buys--;
    }
    await this.cleanup();
    await this.draw(5);
  }

  setSocket(socket) {
    this.socket.setSocket(socket);
  }

  async attacked(effect) {
    let nullified = false;
    await this.hand.asyncForEach(async card => {
      if (await card.onAttacked(this)) {
        nullified = true;
      }
    });
    if (!nullified) {
      await effect();
    }
  }

  async getInputAndNotifyDirty(payload, validate) {
    console.log('get-input');
    const dirty = this.game.createDirty();
    console.log(dirty);
    await this.forEachOtherPlayer(player => {
      let newDirty = dirty;
      if (dirty.players && dirty.players[player.id] && Object.prototype.hasOwnProperty.call(dirty.players[player.id], 'hand')) {
        newDirty = { ...dirty, hand: player.hand.toIDArray() };
      }
      player.socket.emit('get-input', { payload: { type: 'clear-input' }, dirty: newDirty });
    });
    console.log('asdf');
    console.log(dirty);
    console.log(this.id);
    if (dirty.players && dirty.players[this.id] && Object.prototype.hasOwnProperty.call(dirty.players[this.id], 'hand')) {
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

  async selectOptionOrCardsOrSupplies(choices, cardData, supplyData, message) {
    console.log('select-option-or-cards-or-supplies');
    const payload = {};
    if (choices) {
      payload.selectOption = {
        choices,
      };
    }
    let filteredCards = null;
    let filteredSupplies = null;
    if (cardData) {
      const { min, max, predicate, pile } = cardData;
      let { from } = cardData;
      if (pile) {
        console.log(pile);
        filteredCards = pile;
        from = null;
      } else {
        filteredCards = predicate ? this[from].filter(predicate) : this[from];
      }
      if (filteredCards.size === 0 && !supplyData && !choices) {
        return { type: 'select-cards', cards: [] };
      }
      if (filteredCards.size > 0) {
        payload.selectCards = {
          min,
          max,
          cards: filteredCards.toIDArray(),
          from,
        };
      }
    }
    if (supplyData) {
      const { min, max, predicate } = supplyData;
      filteredSupplies = [...this.game.supplies.values()].filter(predicate);
      if (filteredSupplies.length === 0 && !choices && !payload.selectCards) {
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
    if (message) payload.message = message;
    console.log(payload);
    const { type, data } = await this.getInputAndNotifyDirty(payload, res => {
      console.log(res);
      switch (res.type) {
        case 'select-cards':
          return filteredCards && res.data.every(id => filteredCards.hasID(id));
        case 'select-supply':
          return filteredSupplies && res.data.every(name => filteredSupplies.some(supply => supply.title === name));
        case 'select-option':
          return res.data >= 0 && res.data < choices.length;
        default:
          return false;
      }
    });
    console.log(data);
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

  async selectOption(choices, message) {
    console.log('select-option');
    return this.selectOptionOrCardsOrSupplies(choices, null, null, message);
  }

  // If third param is a function then it will filter this[from] by that, and then the cards from this[from] will be higlighted
  // If it is a Pile then those cards will appear on screen without context
  async selectCards({ min, max, predicate, pile, from = 'hand', message }) {
    console.log('select-cards');
    return this.selectOptionOrCardsOrSupplies(null, { min, max, predicate, pile, from }, null, message);
  }

  async selectSupplies({ min, max, predicate, message }) {
    console.log('select-supplies');
    return this.selectOptionOrCardsOrSupplies(null, null, { min, max, predicate }, message);
  }

  async revealHand() {
    await Promise.resolve(this);
  }
}
