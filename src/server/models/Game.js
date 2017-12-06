import Card from 'cards/Card';
import 'cards/basic';
import 'cards/base';
import 'cards/baseSecond';
import 'cards/intrigue';
import 'cards/cornucopia'
import Model from 'models/Model';
import DirtyModel, { trackDirty, DirtyMap } from 'utils/DirtyModel';
import Pile from 'utils/Pile';
import Supply from 'models/Supply';
import Log from 'utils/Log';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

@DirtyModel
export default class Game extends Model {
  name;

  @trackDirty
  players = new DirtyMap();

  @trackDirty
  supplies = new DirtyMap();

  @trackDirty
  organizedSupplies = { victory: [], treasure: [], kingdom: [], nonSupply: [] };

  @trackDirty
  trash = new Pile();

  @trackDirty
  cards = [];

  @trackDirty
  playArea = null;

  @trackDirty(arr => arr.map(({ id }) => id))
  playerOrder = [];

  room = null;

  log = new Log();

  @trackDirty(player => player && player.id)
  currentPlayer = null;

  previousPlayer = null;

  currentPlayerIndex = null;

  constructor(name, io) {
    super();
    console.log(this);
    console.log(Object.keys(this));
    this.room = io.to(this.id);
  }

  getStateFor(player) {
    return { ...this.createDirty(true), hand: player.hand.toIDArray() };
  }

  getKingdomCards() {
    let a = [];
    while (a.length < 10) {
      let unusedCards = [];
      Card.classes.forEach( c => {
        if (c.supplyCategory === 'kingdom' && a.indexOf(c.title) === -1) unusedCards.push(c.title);
      });
      a.push(unusedCards[Math.floor(Math.random() * unusedCards.length)]);
    }
    if (1) {
      return a;
    } else {
      return [
      'Chapel',
      'Cellar',
      'Militia',
      'Moat',
      'Village',
      'YoungWitch'
      ];
    }
  }

  async start() {
    let SuppliesArray = [
      'Curse',
      'Copper',
      'Silver',
      'Gold',
      'Estate',
      'Duchy',
      'Province'];

    const Kingdom = this.getKingdomCards();

    this.log('Kingdom Contains:')
    for (let i = 0; i < Kingdom.length; i++) {
      this.log(`${Kingdom[i]}`);
    }

    if (Kingdom.indexOf('YoungWitch') !== -1) {
      const possibleBanes = [];
      Card.classes.forEach(c => {
        if ((c.cost === 2 || c.cost === 3 ) &&
        Kingdom.indexOf(c.title) === -1 && c.supplyCategory === 'kingdom') possibleBanes.push(c.title);
      });
      let Bane = possibleBanes[Math.floor(Math.random() * possibleBanes.length)];
      Kingdom.push(Bane)
      Card.classes.get(Bane).bane = true;
      this.log(`${Bane} is Young Witch's Bane`);
    }

    Kingdom.forEach( title => {
      Card.classes.get(title).dependancies.forEach( d => {
        if (SuppliesArray.indexOf(d) === -1) {
          SuppliesArray.push(d);
        }
      });
    });

    Kingdom.forEach(c => SuppliesArray.push(c));

    SuppliesArray.forEach((title) => {
      console.log(title);
      this.supplies.set(title, new Supply(title, this));
      this.organizedSupplies[Card.classes.get(title).supplyCategory].push(title);
    });
    Object.keys(this.organizedSupplies).forEach(key => {
      this.organizedSupplies[key].sort((a, b) => this.supplies.get(a).cards.last().cost - this.supplies.get(b).cards.last().cost);
    });
    this.players.forEach(player => {
      player.deck.push(
        ...Array(7).fill().map(() => new (Card.classes.get('Copper'))(this)),
        ...Array(3).fill().map(() => new (Card.classes.get('Estate'))(this)),
      );
      player.deck.shuffle();
    });
    this.players.forEach(player => {
      this.playerOrder.push(player);
    });
    shuffle(this.playerOrder);
    this.currentPlayerIndex = Math.floor(Math.random() * this.playerOrder.length);
    this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
    this.playArea = this.currentPlayer.playArea;
    this.playerOrder.forEach((player, i) => {
      player.setIndex(i);
      player.socket.emit('state', this.getStateFor(player));
    });
    this.clean();
    await this.loop();
  }

  async loop() {
    console.log('drawing...');
    for (let i = 0; i < this.playerOrder.length; i++) {
      await this.playerOrder[i].draw(5);
    }
    for (;;) {
      await this.currentPlayer.takeTurn();
      let numEmptySupplies = 0;
      this.supplies.forEach(supply => {
        if (supply.cards.size === 0 && Card.classes.get(supply.title).supplyCategory !== 'nonSupply') {
          numEmptySupplies++;
        }
      });
      if (
        this.supplies.get('Province').cards.size === 0 ||
        (this.supplies.has('Colony') && this.supploes.get('Colony').cards.size === 0) ||
        numEmptySupplies >= (this.playerOrder.size > 4 ? 4 : 3)
      ) {
        break;
      }
      this.currentPlayerIndex++;
      if (this.currentPlayerIndex === this.players.size) {
        this.currentPlayerIndex = 0;
      }
      this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
      this.playArea = this.currentPlayer.playArea;
    }
  }
}
