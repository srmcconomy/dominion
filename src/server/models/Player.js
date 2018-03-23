import Pile from 'utils/Pile';
import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import AsyncSocket from 'utils/AsyncSocket';
import Card from 'cards/Card';
import EventCard from 'eventCards/EventCard';
import async from 'utils/async';

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

@DirtyModel
class SupplyTokens {
  @trackDirty
  plusAction = null;

  @trackDirty
  plusBuy = null;

  @trackDirty
  plusCard = null;

  @trackDirty
  plusCoin = null;
}

class Event {
  constructor(eventName, triggeringPlayer, game, args) {
    this.name = eventName;
    this.triggeringPlayer = triggeringPlayer;
    this.handledByPlayer = new Map();
    this.handledForCard = new Set();
    this.destination = null;
    game.players.forEach(player => this.handledByPlayer.set(player, false));
    if (args) {
      Object.keys(args).forEach(key => { this[key] = args[key]; });
    }
    if (eventName === 'card-cost') {
      this.costModifiers = [];
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

  @trackDirty
  supplyTokens = new SupplyTokens();

  @trackDirty
  hasMinusCoinToken = false;

  @trackDirty
  hasMinusCardToken = false;

  @trackDirty
  supplyWithMinusCostToken = null;

  @trackDirty
  supplyWithTrashToken = null;

  asidePile = new Pile();

  @trackDirty
  name;

  @trackDirty
  index = null;

  @trackDirty
  actions = 1;

  @trackDirty
  debt = 0;

  @trackDirty
  potion = 0;

  @trackDirty
  coinTokens = 0;

  @trackDirty
  buys = 0;

  @trackDirty
  vpTokens = 0;

  score = 0;

  @trackDirty
  journeyToken = 'faceUp';

  cardsPlayedThisTurn = [];

  cardsGainedThisTurn = [];

  cardsBoughtThisTurn = [];

  boonsReceivedThisTurn = [];

  persistentEffects = new Map();

  game = null;

  socket = null;

  _money = 0;

  set money(value) {
    if (this.hasMinusCoinToken && value > this._money) {
      value--;
      this.hasMinusCoinToken = false;
    }
    this._money = value;
  }

  @trackDirty
  get money() {
    return this._money;
  }

  constructor(name, game, socket) {
    super();
    if (socket) {
      this.socket = new AsyncSocket(socket);
      this.socket.onReconnect(() => this.socket.emit('state', this.game.createDirty(this, true)));
    }
    this.game = game;
    game.players.set(this.id, this);
    this.actions = 1;
    this.money = 0;
    this.debt = 0;
    this.potion = 0;
    this.coinTokens = 0;
    this.buys = 0;
    this.vpTokens = 0;
    this.score = 0;
    this.name = name;
    this.journeyToken = 'faceUp';
    this.turnPhase = 'actionPhase';
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
    let conflictingMandatoryCardsLength = 0;
    const refreshCards = async () => {
      await async([
        { title: 'hand', getAllCards: () => [...this.hand] },
        { title: 'playArea', getAllCards: () => [...this.playArea] },
        { title: 'setAside', getAllCards: () => [...this.asidePile] },
        { title: 'reserve', getAllCards: () => (this.mats.tavern ? [...this.mats.tavern] : []) },
        {
          title: 'persistent',
          getAllCards: () => (
            this.persistentEffects.has(event.name) ?
              [...this.persistentEffects.get(event.name).entries()].reduce((all, [card, count]) => [...all, ...[...new Array(count)].map(() => card)], []) :
              []
          ),
        },
        {
          title: 'other',
          getAllCards: () => otherCardsToCheck.filter(c => (
            !this.hand.includes(c) &&
            !this.playArea.includes(c) &&
            (!this.mats.tavern || !this.mats.tavern.includes(c))
          )),
        },
      ]).forEach(async ({ title, getAllCards }) => {
        cards.optional[title] = await async(getAllCards()).filter(card => !handledCards.has(card) && card.canTriggerOn(event, this, title === 'persistent'));
        cards.mandatory[title] = await async(getAllCards()).map(async card => {
          if (handledCards.has(card)) {
            return null;
          }
          const result = await card.willTriggerOn(event, this, title === 'persistent');
          if (result) {
            let conflicts = true;
            if (result.conflicts === false) {
              conflicts = false;
            }
            return { card, conflicts };
          }
          return null;
        }).filter(obj => !!obj);
      });
      optionalCardsLength = Object.values(cards.optional).reduce((sum, list) => sum + list.length, 0);
      conflictingMandatoryCardsLength = Object.values(cards.mandatory).reduce((sum, list) => sum + list.filter(({ conflicts }) => conflicts).length, 0);
    };
    await refreshCards();

    while (optionalCardsLength > 0 || conflictingMandatoryCardsLength > 1) {
      const [card] = await this.selectCards({
        min: conflictingMandatoryCardsLength > 0 ? 1 : 0,
        max: 1,
        pile: [
          ...Object.values(cards.optional).reduce((all, list) => [...all, ...list], []),
          ...Object.values(cards.mandatory).reduce((all, list) => [...all, ...list.filter(({ conflicts }) => conflicts).map(({ card: c }) => c)], []),
        ],
        message: 'Choose a card to trigger'
      });
      if (!card) break;
      handledCards.add(card);
      const persistent = cards.optional.persistent.includes(card) || cards.mandatory.persistent.includes(card);
      if (event.name === 'start-of-turn' && card.types.has('Duration')) {
        for (let i = 0; i < card.timesPlayed; i++) {
          await card.onTrigger(event, this, persistent ? 'persistent' : 'normal');
        }
      } else {
        await card.onTrigger(event, this, persistent ? 'persistent' : 'normal');
      }
      await refreshCards();
    }

    await async(Object.keys(cards.mandatory)).forEach(async key => {
      const list = cards.mandatory[key];
      await async(list).forEach(async ({ card }) => {
        if (event.name === 'start-of-turn' && card.types.has('Duration')) {
          for (let i = 0; i < card.timesPlayed; i++) {
            await card.onTrigger(event, this, key === 'persistent' ? 'persistent' : 'normal');
          }
        } else {
          await card.onTrigger(event, this, key === 'persistent' ? 'persistent' : 'normal');
        }
      });
    });
  }

  setIndex(index) {
    this.index = index;
  }

  revealHand() {
    if (this.hand.length > 0) {
      this.game.log(`${this.name} reveals a hand of: ${this.hand.map(c => c.name).join(', ')}`);
    } else {
      this.game.log(`${this.name} reveals an empty hand`);
    }
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
    const event = await this.handleTriggers('trash', { cards: [card], from }, [card]);
    if (!event.handledForCard.has(card)) {
      this.moveCard(card, from, this.game.trash);
      return true;
    }
    return false;
  }

  async trashAll(cards, from = this.hand) {
    if (cards.length > 0) {
      this.game.log(`${this.name} trashes ${cards.map(c => c.name).join(', ')}`);
      const event = await this.handleTriggers('trash', { cards, from }, cards);
      for (const card of cards) {
        if (!event.handledForCard.has(card)) {
          this.moveCard(card, from, this.game.trash);
        }
      }
    } else {
      this.game.log(`${this.name} trashes nothing`);
    }
  }

  async discard(card, from = this.hand) {
    this.game.log(`${this.name} discards ${card.name}`);
    const event = await this.handleTriggers('discard', { cards: [card], from }, [card]);
    if (!event.handledForCard.has(card)) {
      this.moveCard(card, from, this.discardPile);
    }
  }

  async discardAll(cards, from = this.hand) {
    if (cards.length > 0) {
      this.game.log(`${this.name} discards ${cards.map(c => c.name).join(', ')}`);
      const event = await this.handleTriggers('discard', { cards, from }, cards);
      for (const card of cards) {
        if (!event.handledForCard.has(card)) {
          this.moveCard(card, from, this.discardPile);
        }
      }
    } else {
      this.game.log(`${this.name} discards nothing`);
    }
  }

  async gainSpecificCard(card, from, to = this.discardPile) {
    const event = await this.handleTriggers('would-gain', { card }, [card]);
    if (event.destination) to = event.destination;
    switch (to) {
      case this.hand:
        this.game.log(`${this.name} gains ${card.name} in to his hand`);
        break;
      case this.deck:
        this.game.log(`${this.name} gains ${card.name} on to his deck`);
        break;
      default:
        this.game.log(`${this.name} gains ${card.name}`);
        break;
    }

    if (!event.handledByPlayer.get(this)) {
      this.moveCard(card, from, to);
      this.cardsGainedThisTurn.push(card);
      await this.handleTriggers('gain', { card }, [card]);
      return true;
    }
  }

  async gain(name, to = this.discardPile) {
    const supply = this.game.supplies.get(name);
    if (supply.cards.length === 0) {
      return null;
    }
    const card = supply.cards.last();

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
    if (card instanceof EventCard) {
      await card.onEventBuy(this);
      this.eventsBoughtThisTurn.push(card);
    } else {
      await this.handleTriggers('buy', { card }, [card]);
      this.cardsBoughtThisTurn.push(card);
      await this.gainSpecificCard(card, supply.cards, to);
    }
    return card;
  }

  lookAtTopOfDeck(num) {
    if (this.deck.size < num) {
      this.game.log(`${this.name} shuffles their deck`);
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
        this.game.log(`${this.name} draws ${numTaken} card${numTaken !== 1 ? 's' : ''}`);
        this.moveCard(this.deck, cards, { num: numTaken });
      }
      if (this.discardPile.size > 0) {
        this.moveCard(this.discardPile, this.deck, { num: this.discardPile.size });
        this.game.log(`${this.name} shuffles their deck`);
        this.deck.shuffle();
      }
    }
    this.game.log(`${this.name} draws ${Math.min(num - numTaken, this.deck.size)} card${Math.min(num - numTaken, this.deck.size) !== 1 ? 's' : ''}`);
    if (this.deck.size > 0) {
      this.moveCard(this.deck, cards, { num: Math.min(num - numTaken, this.deck.size) });
    }
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

  setAside(card, from = this.playArea) {
    this.moveCard(card, from, this.asidePile);
  }

  putOnTavernMat(card, from = this.playArea) {
    if (from.includes(card)) {
      this.game.log(`${this.name} moves ${card.name} to their tavern mat`);
      this.moveCard(card, from, this.mats.tavern);
    }
  }

  flipJourneyToken() {
    if (this.journeyToken === 'faceUp') {
      this.journeyToken = 'faceDown';
    } else {
      this.journeyToken = 'faceUp';
    }
  }

  takeMinusCoinToken() {
    this.hasMinusCoinToken = true;
  }

  async convertToCosts(...costs) {
    const ret = [];

    for (let cost of costs) {
      if (cost instanceof Card) {
        cost = await this.getCardCost(cost);
      }
      if (!(cost instanceof Card.Cost)) {
        cost = new Card.Cost(cost);
      }
      ret.push(cost);
    }
    return ret;
  }

  async compareCosts(cost1, cost2, functionName) {
    const [c1, c2] = await this.convertToCosts(cost1, cost2);
    return c1[functionName](c2);
  }

  async cardCostsLessThanEqualTo(cardOrCost1, cardOrCost2) {
    return this.compareCosts(cardOrCost1, cardOrCost2, 'isLessThanEqualTo');
  }
  async cardCostsLessThan(cardOrCost1, cardOrCost2) {
    return this.compareCosts(cardOrCost1, cardOrCost2, 'isLessThan');
  }
  async cardCostsGreaterThanEqualTo(cardOrCost1, cardOrCost2) {
    return this.compareCosts(cardOrCost1, cardOrCost2, 'isGreaterThanEqualTo');
  }
  async cardCostsGreaterThan(cardOrCost1, cardOrCost2) {
    return this.compareCosts(cardOrCost1, cardOrCost2, 'isGreaterThan');
  }
  async cardCostsEqualTo(cardOrCost1, cardOrCost2) {
    return this.compareCosts(cardOrCost1, cardOrCost2, 'isEqualTo');
  }

  async getCardCost(card) {
    const event = await this.handleTriggers('card-cost', { card }, [card]);
    let { cost } = card;
    event.costModifiers.forEach(modifier => { cost = modifier(cost); });
    return cost;
  }

  returnToSupply(card, from = this.hand) {
    this.game.log(`${this.name} returns ${card.name} to its supply`);
    this.moveCard(card, from, this.game.supplies.get(card.title).cards);
  }

  async cleanup() {
    await this.discardAll([...this.hand]);
    this.playArea.forEach(c => c.updateIgnoreCleanUp());
    const cards = this.playArea.filter(c => !c.ignoreCleanUp);
    await this.discardAll([...cards], this.playArea);
  }

  async endOfGameCleanUp() {
    while (this.hand.size > 0) {
      this.moveCard(this.hand.last(), this.hand, this.deck);
    }
    while (this.playArea.size > 0) {
      this.moveCard(this.playArea.last(), this.playArea, this.deck);
    }
    while (this.asidePile.size > 0) {
      this.moveCard(this.asidePile.last(), this.asidePile, this.deck);
    }
    while (this.discardPile.size > 0) {
      this.moveCard(this.discardPile.last(), this.discardPile, this.deck);
    }
    if (this.mats.tavern) {
      while (this.mats.tavern.size > 0) {
        this.moveCard(this.mats.tavern.last(), this.mats.tavern, this.deck);
      }
    }
    if (this.mats.island) {
      while (this.mats.island.size > 0) {
        this.moveCard(this.mats.island.last(), this.mats.island, this.deck);
      }
    }
    if (this.mats.nativeVillage) {
      while (this.mats.nativeVillage.size > 0) {
        this.moveCard(this.mats.nativeVillage.last(), this.mats.nativeVillage, this.deck);
      }
    }
    this.deck.forEach(c => {
      c.endGameCleanUp(this);
    });
  }

  async handleVanillaBonusTokens(card) {
    if (this.supplyTokens.plusAction === this.game.supplies.get(card.title)) {
      this.actions++;
    }
    if (this.supplyTokens.plusBuy === this.game.supplies.get(card.title)) {
      this.buys++;
    }
    if (this.supplyTokens.plusCard === this.game.supplies.get(card.title)) {
      await this.draw(1);
    }
    if (this.supplyTokens.plusCoin === this.game.supplies.get(card.title)) {
      this.money++;
    }
  }

  async play(card, from = this.hand) {
    this.game.log(`${this.name} plays ${card.name}`);
    this.game.padding += 4;
    const firstEvent = await this.handleTriggers('play-first', { card }, [card]);
    this.cardsPlayedThisTurn.push(card);
    card.timesPlayed = this.cardsPlayedThisTurn.filter(c => c === card).length;
    if (from.includes(card)) this.moveCard(card, from, this.playArea);
    const event = await this.handleTriggers('play', { card }, [card]);
    await this.handleVanillaBonusTokens(card);
    if (!event.handledByPlayer.get(this)) {
      await card.onPlay(this, firstEvent);
    }
    await this.handleTriggers('after-play', { card }, [card]);
    this.game.padding -= 4;
  }

  async forEachOtherPlayer(func) {
    if (this.game.playerOrder.length <= 1) return;
    for (let i = this.index === this.game.playerOrder.length - 1 ? 0 : this.index + 1; i !== this.index; i = i === this.game.playerOrder.length - 1 ? 0 : i + 1) {
      await func(this.game.playerOrder[i]);
    }
  }

  async playMultiple(throne, count = 2, card = null, pile = this.hand) {
    if (!card) {
      [card] = await this.selectCards({
        min: 0,
        max: 1,
        predicate: c => c.types.has('Action'),
        message: `Choose an Action card to play ${count} times`
      });
    }
    if (!throne.cards) throne.cards = [];
    if (card) {
      await this.play(card, pile);
      for (let i = 1; i < count; i++) {
        await this.play(card, this.playArea);
      }
      if (this.playArea.hasID(card.id) && card.types.has('Duration') && card.ignoreCleanUp) {
        throne.cards.push(card);
        throne.ignoreCleanUp |= card.ignoreCleanUp;
      }
    }
    throne.updateIgnoreCleanUp = () => {
      throne.cards.forEach(c => {
        if (!c.ignoreCleanUp) throne.cards.splice(throne.cards.indexOf(c));
      });
      throne.ignoreCleanUp = false;
      throne.cards.forEach(c => {
        throne.ignoreCleanUp |= c.ignoreCleanUp;
      });
    };

    return card;
  }

  async pickCard(card, from, message) {
    const [selected] = await this.selectCards({
      min: 0,
      max: 1,
      pile: from.filter(c => c === card),
      message
    });
    if (selected) return true;
    return false;
  }

  nextPlayer() {
    return this.game.playerOrder[this.index === this.game.playerOrder.length - 1 ? 0 : this.index + 1];
  }

  previousPlayer() {
    return this.game.playerOrder[this.index === 0 ? this.game.playerOrder.length - 1 : this.index - 1];
  }

  async overpay() {
    const tempCost = { coin: 0, potion: 0, debt: 0 };
    while (this.money > 0 || this.potion > 0) {
      const options = [];
      if (this.money) options.push('Over Pay a Coin');
      if (this.potion) options.push('Over Pay a Potion');
      options.push('No more Overpay');
      const message = `Overpay currently at ${tempCost.coin} Coin`;
      if ([...this.game.supplies.values()].some(s => s.title === 'Potion')) message = `Overpay currently at ${tempCost.coin} Coin, ${tempCost.potion} Potion`;
      const choice = await this.selectOption(options, message);
      if (choice === 0) {
        this.money--;
        tempCost.coin++;
      } else if (choice === options.length - 1) {
        break;
      } else {
        this.potion--;
        tempCost.potion++;
      }
    }

    if (tempCost.potion > 0) {
      this.game.log(`${this.name} overpays ${tempCost.coin} coin and ${tempCost.potion} potion`);
    } else this.game.log(`${this.name} overpays ${tempCost.coin} coin`);
    return tempCost;
  }

  async takeBoon(num = 1, receiveNow = true) {
    if (this.game.boonPile < num) {
      this.game.boonDiscardPile.shuffle();
      this.moveCard(this.game.boonDiscardPile, this.game.boonPile, { num: this.game.boonDiscardPile.size });
    }

    num = Math.min(num, this.game.boonPile.size);
    const boons = new Pile();
    while (num-- > 0) {
      const boon = this.game.boonPile.last();
      if (receiveNow) {
        await this.receiveBoon(boon, this.game.boonPile);
        return boon;
      } else {
        this.moveCard(boon, this.game.boonPile, boons);
      }
    }
    return boons;
  }

  async receiveBoon(boon, from) {
    this.game.log(`${this.name} receives boon: ${boon.title}, ${this.game.boonPile.length} ${this.game.boonDiscardPile.length}`);
    this.boonsReceivedThisTurn.push(boon);
    await boon.effect(this, from);
    if (from.includes(boon)) this.moveCard(boon, from, this.game.boonDiscardPile);
  }

  async receiveHex() { }

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
              if (this.hand.some(card => card.types.has('Treasure')) || this.coinTokens > 0) {
                console.log('ask for cards');
                const basicTreasures = this.hand.some(c => ['Copper', 'Silver', 'Gold', 'Platinum', 'Potion'].includes(c.title));
                const options = [];
                if (basicTreasures) options.push('Play treasures');
                if (this.coinTokens > 0) {
                  options.push('Spend a Coin Token');
                  options.push('Don\'t');
                }
                const res = await this.selectOptionOrCardsOrSupplies(
                  options.length > 0 ? options : null,
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
                  if (basicTreasures) {
                    let i = 0;
                    while (i < this.hand.size) {
                      const card = this.hand.get(i);
                      if (['Copper', 'Silver', 'Gold', 'Platinum', 'Potion'].includes(card.title)) {
                        await this.play(card);
                      } else {
                        i++;
                      }
                    }
                  } else {
                    this.game.log(`${this.name} pays a coin token, (${--this.coinTokens} remaining)`);
                    this.money++;
                  }
                } else if (res === 1) {
                  if (basicTreasures) {
                    this.game.log(`${this.name} pays a coin token, (${--this.coinTokens} remaining)`);
                    this.money++;
                  } else this.buyState = 'buyCards';
                } else if (res === 2) {
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
                  ['End buys'],
                  null,
                  {
                    min: 0,
                    max: 1,
                    predicate: s => (
                      s.cards.size > 0 &&
                      this.cardCostsLessThanEqualTo(
                        s.cards.last(),
                        {
                          coin: this.money,
                          potion: this.potion,
                          debt: Infinity,
                        },
                      )
                    ),
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
                    const tempCost = await this.getCardCost(card);
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
          if (this.hand.some(card => card.types.has('Night'))) {
            const [card] = await this.selectCards({ min: 0, max: 1, predicate: c => c.types.has('Night'), message: 'Select an night card to play' });
            if (card) {
              await this.play(card);
              break;
            }
          }
          this.turnPhase = 'cleanUpPhase';
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
    await this.handleTriggers('end-of-turn');
  }

  async takeTurn() {
    this.game.padding = 0;
    this.game.log('\u00A0');
    this.game.log(`Turn: ${this.game.turnNumber}`);
    this.game.log(`${this.name} starts their turn`);
    this.game.padding += 4;
    this.actions = 1;
    this.buys = 1;
    this.money = 0;
    this.potion = 0;
    this.actionsPlayedThisTurn = 0;
    this.turnPhase = 'actionPhase';
    this.cardsPlayedThisTurn = [];
    this.cardsGainedThisTurn = [];
    this.cardsBoughtThisTurn = [];
    this.eventsBoughtThisTurn = [];
    this.boonsReceivedThisTurn = [];

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
      payload.lastInputWasInvalid = true;
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
        filteredCards = predicate ? await async([...this[from]]).filter(predicate) : this[from];
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
      const { min, max, predicate, includeNonSupply, includeEvents } = supplyData;
      const newPredicate = supply => {
        if (!includeNonSupply && supply.category === 'nonSupply') {
          return false;
        }
        if (!includeEvents && supply.category === 'event') {
          return false;
        }
        return predicate(supply);
      };
      filteredSupplies = predicate ? await async([...this.game.supplies.values()]).filter(newPredicate) : [...this.game.supplies.values()];
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
          return choices ? (res.data >= 0 && res.data < choices.length) : false;
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

  async selectSupplies({ min, max, predicate, message, includeNonSupply = false, includeEvents = false }) {
    console.log('select-supplies');
    return this.selectOptionOrCardsOrSupplies(null, null, { min, max, predicate, includeNonSupply, includeEvents }, message);
  }

}
