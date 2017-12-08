import Pile from 'utils/Pile';
import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import DirtyModel, { trackDirty } from 'utils/DirtyModel';
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

  playArea = new Pile();

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

  journeyToken = 'faceUp';

  @trackDirty
  cardsPlayedThisTurn = [];

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
    this.debt = 0;
    this.potion = 0;
    this.buys = 0;
    this.vpTokens = 0;
    this.name = name;
    this.journeyToken = 'faceUp';
    this.turnPhase = 'actionPhase';
  }

  async handleReactions(event, ...args) {
    await this.forEachOtherPlayer(player => player.handleOwnReactions(event, this, ...args));
    await this.handleOwnReactions(event, this, ...args);
  }

  async handleOwnReactions(event, player, ...args) {
    const handledReactions = new Set();
    let reactions = this.hand.filter(card => !handledReactions.has(card) && card.shouldReactTo(event, this, player, ...args));
    let handled = false;
    const predicate = card => reactions.includes(card);
    while (reactions.length > 0) {
      const [reaction] = await this.selectCards({ min: 0, max: 1, predicate, message: 'Choose a card to react with' });
      if (!reaction) {
        break;
      }
      handledReactions.add(reaction);
      reactions = this.hand.filter(card => !handledReactions.has(card) && card.shouldReactTo(event, this, player, ...args));

      handled = await reaction.reactTo(event, this, player, ...args) || handled;
    }
    return handled;
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
          console.log(cards);
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
    await card.onTrash(this);
    await this.handleReactions('trash', card);
  }

  async discard(card, from = this.hand) {
    this.game.log(`${this.name} discards ${card.name}`);
    this.moveCard(card, from, this.discardPile);
    await card.onDiscard(this);
  }

  async gainSpecificCard(card, from, to = this.discardPile) {
    await this.handleReactions('before-gain', card);
    this.game.log(`${this.name} gains ${card.name}`);
    this.moveCard(from, to);
    await card.onGain(this);
    await this.handleReactions('after-gain', card);
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

  lookAtTopOfDeck(num) {
    if (this.deck.size < num) {
      this.discardPile.shuffle();
      this.moveCard(this.discardPile, this.deck, { num: this.discardPile.size });
    }
    const cards = [];
    for (let i = 0; i < Math.min(num, this.deck.size); ++i) {
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
    this.game.log(`${this.name} draws ${cards.length} cards`);
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
    let tempCost = card.getCost(this);

    tempCost.coin -= this.cardsPlayedThisTurn.filter(c => {
      c.title === 'Bridge'
    }).length;
    tempCost.coin -= this.playArea.filter(c => {
      (c.title === 'Highway' || c.title === 'BridgeTroll')
    }).length;
    if (card.types.has('Action')) {
      tempCost.coin -= 2*this.playArea.filter(c => {
      c.title === 'Quarry'
      }).length;
    }
    tempCost.coin = Math.max(tempCost.coin, 0);

    return tempCost;

  }

  costsLessThanEqualTo(card, cost) {
    const tempCardCost = this.getCardCost(card);
    const tempCost = {coin:0, debt:0, potion:0, ...cost};

    return (
      tempCardCost.coin <= tempCost.coin &&
      tempCardCost.debt <= tempCost.debt &&
      tempCardCost.potion <= tempCost.potion
      );
  }

  costsEqualTo(card, cost) {
    const tempCardCost = this.getCardCost(card);
    const tempCost = {coin:0, debt:0, potion:0, ...cost};

    return (
      tempCardCost.coin === tempCost.coin &&
      tempCardCost.debt === tempCost.debt &&
      tempCardCost.potion === tempCost.potion
      );;
  }

  async cleanup() {
    while (this.hand.size > 0) {
      await this.discard(this.hand.last());
    }
    while (this.playArea.size > 0) {
      await this.discard(this.playArea.last(), this.playArea);
    }
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
  }

  async play(card) {
    this.game.log(`${this.name} plays ${card.name}`);
    this.cardsPlayedThisTurn.push(card);
    this.moveCard(card, this.hand, this.playArea);
    await card.onPlay(this);
  }

  async forEachOtherPlayer(func) {
    if (this.game.playerOrder.length <= 1) return;
    for (let i = this.index === this.game.playerOrder.length - 1 ? 0 : this.index + 1; i !== this.index; i = i === this.game.playerOrder.length - 1 ? 0 : i + 1) {
      await func(this.game.playerOrder[i]);
    }
  }

  async processTurnPhases() {
    let doneTurn = false;
    while (doneTurn === false) {
      switch (this.turnPhase) {
        case 'actionPhase':
        {
          while (this.actions > 0 && this.hand.some(card => card.types.has('Action'))) {
            const [card] = await this.selectCards({ min: 0, max: 1, predicate: c => c.types.has('Action'), message: 'Select an action to play' });
            if (!card) break;
            this.actions--;
            await this.play(card);
          }
          if (this.turnPhase === 'actionPhase') this.turnPhase = 'buyPhase';
        }
        break;
        case 'buyPhase':
        {
          while (this.hand.some(card => card.types.has('Treasure'))) {
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
            } else {
              const [card] = res;
              console.log('card selected:');
              console.log(card);
              if (!card) break;
              await this.play(card);
            }
          }
          while (this.buys > 0) {
            this.debt -= Math.min(this.debt, this.money);
            console.log('ask for supplies');
            const res = await this.selectOptionOrCardsOrSupplies(
              ['End turn'],
              null,
              {
                min: 0,
                max: 1,
                predicate: s => {
                  const tempCost = this.getCardCost(s.cards.last());
                  return (s.cards.size > 0 && (
                  this.money >= tempCost.coin &&
                  this.debt === 0 &&
                  this.potion >= tempCost.potion));
                }
              },
              'Select a card to buy',
            );
            if (res === 0) {
              break;
            }
            const [supply] = res;
            console.log('card selected:');
            console.log(supply);
            if (!supply) break;
            const card = await this.gain(supply.title);
            await this.handleReactions('buy', this, card);
            const temoCost = this.getCardCost(card);
            this.money -= temoCost.coin;
            this.debt += temoCost.debt;
            this.potion -= temoCost.potion;
            this.buys--;
          }
          if (this.turnPhase === 'buyPhase') this.turnPhase = 'nightPhase';
        }
        break;
        case 'nightPhase':
        {
          if (this.turnPhase === 'nightPhase') this.turnPhase = 'cleanUpPhase';
        }
        break;
        case 'cleanUpPhase':
        {
          await this.cleanup();
          await this.draw(5);
          this.game.previousPlayer = this;
          this.turnPhase = 'actionPhase';
          doneTurn = true;
        }
        break;
        default:
        {
          this.turnPhase = 'actionPhase'
        }
        break;
      }
    }
  }

  async takeTurn() {
    this.game.log(`${this.name} starts their turn`);
    this.actions = 1;
    this.buys = 1;
    this.money = 0;
    this.potion = 0;
    this.actionsPlayedThisTurn = 0;
    this.turnPhase = 'actionPhase';
    this.cardsPlayedThisTurn = [];

    await this.processTurnPhases();
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
    const dirty = this.game.createDirty();
    const log = this.game.log.getNewMessages();
    await this.forEachOtherPlayer(player => {
      let newDirty = dirty;
      if (dirty.players && dirty.players[player.id] && Object.prototype.hasOwnProperty.call(dirty.players[player.id], 'hand')) {
        newDirty = { ...dirty, hand: player.hand.toIDArray() };
      }
      player.socket.emit('get-input', { payload: { type: 'clear-input' }, dirty: newDirty, log });
    });
    if (dirty.players && dirty.players[this.id] && Object.prototype.hasOwnProperty.call(dirty.players[this.id], 'hand')) {
      dirty.hand = this.hand.toIDArray();
    }
    this.game.clean();
    for (;;) {
      console.log('loop');
      const response = await this.socket.emitAndWait('get-input', {
        payload,
        dirty,
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
      if (filteredCards.size === 0 && !supplyData && !choices) {
        return filteredCards;
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
