import { readonly, nonenumerable } from 'core-decorators';

import Card from 'cards/Card';
import 'cards/basic';
import DirtyModel from 'models/DirtyModel';
import DirtyMap from 'models/DirtyMap';
import Pile from 'utils/Pile';
import Supply from 'models/Supply';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export default class Game extends DirtyModel {
  name;

  @readonly
  players = new DirtyMap();

  @readonly
  supplies = new DirtyMap();

  @readonly
  organizedSupplies = { victory: [], treasure: [], kingdom: [], nonsupply: [] };

  @readonly
  trash = new Pile();

  @readonly
  cards = [];

  @readonly
  playerOrder = [];

  @nonenumerable
  room = null;

  @nonenumerable
  currentPlayer = null;

  @nonenumerable
  currentPlayerIndex = null;

  constructor(name, io) {
    super();
    this.room = io.to(this.id);
    this.playerOrder.toJSON = () => this.playerOrder.map(({ id }) => id);
    Object.defineProperty(this, 'currentPlayerID', { get() { return this.currentPlayer && this.currentPlayer.id; }, enumerable: true });
  }

  getStateFor(player) {
    return { ...this, hand: player.hand.toIDArray() };
  }

  async start() {
    [
      'Copper',
      'Silver',
      'Gold',
      'Estate',
      'Duchy',
      'Province',
    ].forEach((title) => {
      this.supplies.set(title, new Supply(title, this));
      this.supplies.get(title).on('dirty', () => {
        if (!this._dirty.supplies) {
          this._dirty.supplies = {};
        }
        this._dirty.supplies[title] = true;
      });
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
    this.playerOrder.forEach((player, i) => {
      player.setIndex(i);
      player.socket.emit('state', this.getStateFor(player));
    });
    this.clean();
    await this.loop();
  }

  async loop() {
    this.playerOrder.forEach(player => player.draw(5));
    for (;;) {
      await this.currentPlayer.takeTurn();
      this.currentPlayerIndex++;
      if (this.currentPlayerIndex === this.players.size) {
        this.currentPlayerIndex = 0;
      }
      this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
      this._dirty.currentPlayerID = true;
    }
  }
}
