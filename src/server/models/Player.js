import Pile from 'utils/Pile';
import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import AsyncSocket from 'utils/AsyncSocket';

const dirtyTransforms = {
  size: pile => ({ id: pile.id, size: pile.size }),
  top: pile => ({ id: pile.id, top: pile.size > 0 ? pile.last().id : null }),
  full: pile => ({ id: pile.id, pile: pile.map(c => c.id) }),
};

@DirtyModel
class Mats {
  @trackDirty
  tavern = null;

  @trackDirty
  island = null;

  @trackDirty
  nativeVillage = null;

  @trackDirty
  pirateShip = null;

  @trackDirty
  tradeRoute = null;

  cleanup(player) {
    [this.tavern, this.island, this.nativeVillage].forEach(pile => {
      while (pile.size > 0) {
        this.moveCard(pile, player.deck);
      }
    });
  }
}

class Event {
  constructor(eventName, triggeringPlayer, game, args) {
    this.name = eventName;
    this.triggeringPlayer = triggeringPlayer;
    this.handledByPlayer = new Map();
    game.players.forEach(player => this.handledByPlayer.set(player, false));
    if (args) {
      Object.keys(args).forEach(key => { this[key] = args[key]; });
    }
  }
}

@DirtyModel
@EventEmitter
export default class Player extends Model {
  @trackDirty((viewer, self) => (viewer === self ? dirtyTransforms.full : dirtyTransforms.size))
  hand = new Pile();

  @trackDirty(() => dirtyTransforms.size)
  deck = new Pile();

  @trackDirty(() => dirtyTransforms.top)
  discardPile = new Pile();

  @trackDirty(() => dirtyTransforms.full)
  playArea = new Pile();

  @trackDirty
  mats = new Mats();

  tavernMat = new Pile();

  islandMat = new Pile();

  nativeVillageMat = new Pile();

  @trackDirty
  name;

  @trackDirty
  index = null;

  @trackDirty
  actions = 1;

  @trackDirty
  money = 0;

  @trackDirty
  debt = 0;

  @trackDirty
  potion = 0;

  @trackDirty
  buys = 0;

  @trackDirty
  vpTokens = 0;

  @trackDirty
  journeyToken = 'faceUp';

  cardsPlayedThisTurn = [];

  cardsGainedThisTurn = [];

  cardsBoughtThisTurn = [];

  silentEffects = new Map();
  persistentEffects = new Map();

  game = null;

  socket = null;

  constructor(name, game, socket) {
    super();

    this.socket = new AsyncSocket(socket);
    this.socket.onReconnect(() => this.socket.emit('state', this.game.createDirty(this, true)));
    this.game = game;
    game.players.set(this.id, this);
    this.actions = 1;
    this.money = 0;
    this.debt = 0;
    this.potion = 0;
    this.buys = 0;
    this.vpTokens = 0;
    this.name = name;
    this.journeyToken = 'faceUp';
    this.turnPhase = 'actionPhase';
    this.padding = 0;
  }

  addSilentEffect(eventName, card) {
    if (!this.silentEffects.has(eventName)) {
      this.silentEffects.set(eventName, new Map());
    }
    const eventMap = this.silentEffects.get(eventName);
    if (!eventMap.has(card)) {
      eventMap.set(card, 0);
    }
    eventMap.set(card, eventMap.get(card) + 1);
  }

  removeSilentEffect(eventName, card) {
    if (this.silentEffects.has(eventName)) {
      const eventMap = this.silentEffects.get(eventName);
      if (eventMap.has(card)) {
        eventMap.set(card, eventMap.get(card) - 1);
      }
      if (eventMap.get(card) <= 0) {
        eventMap.delete(card);
      }
    }
  }

  addPersistentEffect(eventName, card) {
    if (!this.persistentEffects.has(eventName)) {
      this.persistentEffects.set(eventName, new Map());
    }
    const eventMap = this.persistentEffects.get(eventName);
    if (!eventMap.has(card)) {
      eventMap.set(card, 0);
    }
    eventMap.set(card, eventMap.get(card) + 1);
  }

  removePersistentEffect(eventName, card) {
    if (this.persistentEffects.has(eventName)) {
      const eventMap = this.persistentEffects.get(eventName);
      if (eventMap.has(card)) {
        eventMap.set(card, eventMap.get(card) - 1);
      }
      if (eventMap.get(card) <= 0) {
        eventMap.delete(card);
      }
    }
  }

  async handleTriggers(eventName, args, otherCardsToCheck) {
    const event = new Event(eventName, this, this.game, args);
    await this.handleOwnTriggers(event, otherCardsToCheck);
    await this.forEachOtherPlayer(player => player.handleOwnTriggers(event, otherCardsToCheck));
    return event;
  }

  async handleOwnTriggers(event, otherCardsToCheck = []) {
    const handledCards = new Set();
    const cards = {
      optional: {},
      mandatory: {},
    };
    let optionalCardsLength = 0;
    let mandatoryCardsLength = 0;
    const refreshCards = () => {
      [
        { title: 'hand', getAllCards: () => [...this.hand] },
        { title: 'playArea', getAllCards: () => [...this.playArea] },
        { title: 'reserve', getAllCards: () => (this.mats.tavern ? [...this.mats.tavern] : []) },
        {
          title: 'persistent',
          getAllCards: () => (
            this.persistentEffects.has(event.name) ?
              [...this.persistentEffects.get(event.name).entries()].reduce((all, [card, count]) => [...all, ...[...new Array(count)].map(() => card)], []) :
              []
          ),
        },
        { title: 'other', getAllCards: () => otherCardsToCheck },
      ].forEach(({ title, getAllCards }) => {
        cards.optional[title] = getAllCards().filter(card => !handledCards.has(card) && card.canTriggerOn(event, this, title === 'persistent' ? 'persistent' : 'normal'));
        cards.mandatory[title] = getAllCards().filter(card => !handledCards.has(card) && card.willTriggerOn(event, this, title === 'persistent' ? 'persistent' : 'normal'));
      });
      optionalCardsLength = Object.values(cards.optional).reduce((sum, list) => sum + list.length, 0);
      mandatoryCardsLength = Object.values(cards.mandatory).reduce((sum, list) => sum + list.length, 0);
    };
    refreshCards();

    while (optionalCardsLength > 0 || mandatoryCardsLength > 1) {
      const [card] = await this.selectCards({
        min: mandatoryCardsLength > 0 ? 1 : 0,
        max: 1,
        pile: [
          ...Object.values(cards.optional).reduce((all, list) => [...all, ...list], []),
          ...Object.values(cards.mandatory).reduce((all, list) => [...all, ...list], []),
        ],
        message: 'Choose a card to trigger'
      });
      if (!card) break;
      handledCards.add(card);
      const persistent = cards.optional.persistent.includes(card) || cards.mandatory.persistent.includes(card);
      await card.onTrigger(event, this, persistent ? 'persistent' : 'normal');
      refreshCards();
    }

    for (const key of Object.keys(cards.mandatory)) {
      const list = cards.mandatory[key];
      if (list.length > 0) await list[0].onTrigger(event, this, key === 'persistent' ? 'persistent' : 'normal');
    }

    if (this.silentEffects.has(event.name)) {
      for (const [card, count] of this.silentEffects.get(event.name).entries()) {
        for (let i = 0; i < count; ++i) {
          await card.onTrigger(event, this, 'silent');
        }
      }
    }
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
          cards = [...fromPile.spliceLast(num)];
          break;
        case 'bottom':
          cards = [...fromPile.spliceFirst(num)];
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
    this.game.eventQueue.push({
      type: 'move-card',
      from: fromPile.id,
      to: toPile.id,
      cards: cards.map(c => c.id),
      player: this.id,
    });
    return cards;
  }

  async trashFromPile(pile) {
    if (pile.size === 0) {
      return;
    }
    const card = pile.last();
    await this.trash(card, pile);
  }

  async trash(card, from = this.hand) {
    this.game.log(`${this.name} trashes ${card.name}`);
    this.moveCard(card, from, this.game.trash);
    await this.handleTriggers('trash', { card }, [card]);
  }

  async discard(card, from = this.hand) {
    this.game.log(`${this.name} discards ${card.name}`);
    const event = await this.handleTriggers('discard', { card, from }, [card]);
    if (!event.handledByPlayer.get(this)) {
      this.moveCard(card, from, this.discardPile);
    }
  }

  async discardMulti(from) {
    const num = from.length;
    while (from.length > 0) {
      const card = from.last()
      this.moveCard(card, from, this.discardPile);
      await card.onDiscard(this);
    }
    this.gameLog(`${this.name} discards ${num} card${num !== 1 ? 's' : ''}`);
  }

  async gainSpecificCard(card, from, to = this.discardPile) {
    const event = await this.handleTriggers('would-gain', { card }, [card]);
    this.game.log(`${this.name} gains ${card.name}`);
    if (!event.handledByPlayer.get(this)) {
      this.moveCard(from, to);
      await this.handleTriggers('gain', { card }, [card]);
    }
  }

  async gain(name, to = this.discardPile) {
    const supply = this.game.supplies.get(name);
    if (supply.cards.length === 0) {
      return null;
    }
    const card = supply.cards.last();
    this.cardsGainedThisTurn.push(card);
    await this.gainSpecificCard(card, supply.cards, to);
    return card;
  }

  async buy(name, to = this.discardPile) {
    const supply = this.game.supplies.get(name);
    if (supply.cards.length === 0) {
      return null;
    }
    const card = supply.cards.last();
    this.game.log(`${this.name} buys ${card.name}`);
    await this.handleTriggers('buy', { card }, [card]);
    this.cardsBoughtThisTurn.push(card);
    await this.gain(name, to);
    return card;
  }

  lookAtTopOfDeck(num) {
    if (this.deck.size < num) {
      this.discardPile.shuffle();
      this.moveCard(this.discardPile, this.deck, { num: this.discardPile.size, toWhere: 'bottom' });
    }
    const cards = [];
    num = Math.min(num, this.deck.size);
    for (let i = 0; i < num; ++i) {
      cards.push(this.deck.get((this.deck.size - num) + i));
    }
    return cards;
  }

  draw(
    num,
    putInHand = true,
  ) {
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
      console.log(cards);
    }
    this.game.log(`${this.name} draws ${cards.length} card${cards.length !== 1 ? 's' : ''}`);
    if (putInHand) {
      this.hand.push(...cards);
    }
    return cards;
  }

  topDeck(card, from = this.hand) {
    this.moveCard(card, from, this.deck);
  }

  pickUp(card, from = this.playArea) {
    this.moveCard(card, from, this.hand);
  }

  flipJourneyToken() {
    if (this.journeyToken === 'faceUp') {
      this.journeyToken = 'faceDown';
    } else {
      this.journeyToken = 'faceUp';
    }
  }

  getCardCost(card) {
    if (!card) return { coin: null, debt: null, potion: null };
    const tempCost = card.getCost(this);

    tempCost.coin -= this.cardsPlayedThisTurn.filter(c => c.title === 'Bridge').length;
    tempCost.coin -= this.playArea.filter(c => c.title === 'Highway' || c.title === 'BridgeTroll').length;
    if (card.types.has('Action')) {
      tempCost.coin -= 2 * this.playArea.filter(c => c.title === 'Quarry').length;
    }
    tempCost.coin = Math.max(tempCost.coin, 0);

    return tempCost;
  }

  costsLessThanEqualTo(card, cost) {
    if (!card) return false;
    const tempCardCost = this.getCardCost(card);
    const tempCost = { coin: 0, debt: 0, potion: 0, ...cost };

    return (
      tempCardCost.coin <= tempCost.coin &&
      tempCardCost.debt <= tempCost.debt &&
      tempCardCost.potion <= tempCost.potion
    );
  }

  costsMoreThanEqualTo(card, cost) {
    if (!card) return false;
    const tempCardCost = this.getCardCost(card);
    const tempCost = { coin: 0, debt: 0, potion: 0, ...cost };

    return (
      tempCardCost.coin >= tempCost.coin &&
      tempCardCost.debt >= tempCost.debt &&
      tempCardCost.potion >= tempCost.potion
    );
  }

  costsEqualTo(card, cost) {
    if (!card) return false;
    const tempCardCost = this.getCardCost(card);
    const tempCost = { coin: 0, debt: 0, potion: 0, ...cost };

    return (
      tempCardCost.coin === tempCost.coin &&
      tempCardCost.debt === tempCost.debt &&
      tempCardCost.potion === tempCost.potion
    );
  }

  returnToSupply(card, from = this.hand) {
    this.moveCard(card, from, this.game.supplies.get(card.title).cards);
  }

  async cleanup() {
    let card;
    while (card = this.playArea.find(c => !c.ignoreCleanUp)) {
      await this.discard(card, this.playArea);
    }
    await this.discardMulti(this.hand);
  }

  async endOfGameCleanUp() {
    while (this.hand.size > 0) {
      this.moveCard(this.hand.last(), this.hand, this.deck);
    }
    while (this.playArea.size > 0) {
      this.moveCard(this.hand.last(), this.playArea, this.deck);
    }
    while (this.discardPile.size > 0) {
      this.moveCard(this.hand.last(), this.discardPile, this.deck);
    }
    while (this.tavernMat.size > 0) {
      this.moveCard(this.hand.last(), this.tavernMat, this.deck);
    }
    while (this.islandMat.size > 0) {
      this.moveCard(this.hand.last(), this.islandMat, this.deck);
    }
    while (this.nativeVillageMat.size > 0) {
      this.moveCard(this.hand.last(), this.nativeVillageMat, this.deck);
    }
    this.deck.forEach(c => {
      c.endGameCleanUp(this);
    });
  }

  async play(card) {
    this.game.log(`${this.name} plays ${card.name}`);
    this.padding += 4;
    const firstEvent = await this.handleTriggers('play-first', { card }, [card]);
    this.cardsPlayedThisTurn.push(card);
    this.moveCard(card, this.hand, this.playArea);
    const event = await this.handleTriggers('play', { card }, [card]);
    if (!event.handledByPlayer.get(this)) {
      await card.onPlay(this, firstEvent);
    }
    await this.handleTriggers('after-play', { card }, [card]);
    this.padding -= 4;
  }

  async forEachOtherPlayer(func) {
    if (this.game.playerOrder.length <= 1) return;
    for (let i = this.index === this.game.playerOrder.length - 1 ? 0 : this.index + 1; i !== this.index; i = i === this.game.playerOrder.length - 1 ? 0 : i + 1) {
      await func(this.game.playerOrder[i]);
    }
  }

  async processTurnPhases() {
    let doneTurn = false;
    this.buyState = 'playTreasures';

    await this.handleTriggers('start-of-turn');

    while (doneTurn === false) {
      switch (this.turnPhase) {
        case 'actionPhase':
          if (this.actions > 0 && this.hand.some(card => card.types.has('Action'))) {
            const [card] = await this.selectCards({ min: 0, max: 1, predicate: c => c.types.has('Action'), message: 'Select an action to play' });
            if (card) {
              this.actions--;
              await this.play(card);
              break;
            }
          }
          this.turnPhase = 'buyPhase';
          this.buyState = 'playTreasures';
          break;
        case 'buyPhase':
          switch (this.buyState) {
            case 'playTreasures':
              if (this.hand.some(card => card.types.has('Treasure'))) {
                console.log('ask for cards');
                const res = await this.selectOptionOrCardsOrSupplies(
                  ['Play all treasures'],
                  {
                    min: 0,
                    max: 1,
                    predicate: c => c.types.has('Treasure'),
                    from: 'hand'
                  },
                  null,
                  'Select a treasure to play',
                );
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
                  this.buyState = 'buyCards';
                } else {
                  const [card] = res;
                  if (card) {
                    console.log('card selected:');
                    console.log(card);
                    await this.play(card);
                  } else this.buyState = 'buyCards';
                }
              } else {
                this.buyState = 'buyCards';
              }
              break;
            case 'buyCards':
              if (this.debt) {
                const debtPayed = Math.min(this.debt, this.money);
                this.debt -= debtPayed;
                this.money -= debtPayed;
                this.game.log(`${this.name} pays off ${debtPayed} debt, has ${this.debt} debt remaining`);
              }
              if (this.buys > 0 && this.debt === 0) {
                console.log('ask for supplies');
                const res = await this.selectOptionOrCardsOrSupplies(
                  ['End turn'],
                  null,
                  {
                    min: 0,
                    max: 1,
                    predicate: s => {
                      if (s.cards.size > 0) {
                        const tempCost = this.getCardCost(s.cards.last());
                        return (
                          this.money >= tempCost.coin &&
                          this.debt === 0 &&
                          this.potion >= tempCost.potion
                        );
                      }
                      return false;
                    },
                  },
                  'Select a card to buy',
                );
                if (res === 0) {
                  if (this.turnPhase === 'buyPhase') {
                    this.turnPhase = 'nightPhase';
                  }
                } else {
                  const [supply] = res;
                  if (supply) {
                    console.log('card selected:');
                    console.log(supply);
                    const card = await this.buy(supply.title);
                    const tempCost = this.getCardCost(card);
                    this.money -= tempCost.coin;
                    this.debt += tempCost.debt;
                    this.potion -= tempCost.potion;
                    this.buys--;
                  } else if (this.turnPhase === 'buyPhase') {
                    this.turnPhase = 'nightPhase';
                  }
                }
              } else if (this.turnPhase === 'buyPhase') {
                this.turnPhase = 'nightPhase';
              }
              break;
            default:
              break;
          }
          break;
        case 'nightPhase':
          if (this.turnPhase === 'nightPhase') {
            this.turnPhase = 'cleanUpPhase';
          }
          break;
        case 'cleanUpPhase': {
          const event = await this.handleTriggers('cleanup');
          if (!event.handledByPlayer.get(this)) {
            await this.cleanup();
            await this.draw(5);
          }
          this.turnPhase = 'actionPhase';
          doneTurn = true;
          break;
        }
        default:
          this.turnPhase = 'actionPhase';
          break;
      }
    }
  }

  async takeTurn() {
    this.padding = 0;
    this.game.log(`${this.name} starts their turn`);
    this.padding += 4;
    this.actions = 1;
    this.buys = 1;
    this.money = 0;
    this.potion = 0;
    this.actionsPlayedThisTurn = 0;
    this.turnPhase = 'actionPhase';
    this.cardsPlayedThisTurn = [];
    this.cardsGainedThisTurn = [];
    this.cardsBoughtThisTurn = [];

    await this.processTurnPhases();
  }

  setSocket(socket) {
    this.socket.setSocket(socket);
  }

  async getInputAndNotifyDirty(payload, validate) {
    const log = this.game.log.getNewMessages();
    await this.forEachOtherPlayer(player => {
      const dirty = this.game.createDirty(player);
      player.socket.emit('get-input', { payload: { type: 'clear-input' }, dirty, log });
    });
    const ownDirty = this.game.createDirty(this);
    this.game.clean();
    for (;;) {
      console.log('loop');
      const response = await this.socket.emitAndWait('get-input', {
        payload,
        dirty: ownDirty,
        log,
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
        filteredCards = pile;
        from = null;
      } else {
        filteredCards = predicate ? this[from].filter(predicate) : this[from];
      }
      if (filteredCards.length === 0 && !supplyData && !choices) {
        return filteredCards;
      }
      if (filteredCards.length > 0) {
        payload.selectCards = {
          min,
          max,
          cards: filteredCards.map(card => card.id),
          from,
        };
      }
    }
    if (supplyData) {
      const { min, max, predicate } = supplyData;
      filteredSupplies = predicate ? [...this.game.supplies.values()].filter(predicate) : [...this.game.supplies.values()];
      if (filteredSupplies.length === 0 && !choices && !payload.selectCards) {
        return filteredSupplies;
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
          return filteredCards && res.data.every(id => filteredCards.some(card => card.id === id));
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
