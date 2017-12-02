import Card from 'cards/Card';
import 'cards/basic';
import 'cards/base';
import 'cards/baseSecond';
import 'cards/intrigue';
import 'cards/seaside';
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
  organizedSupplies = { victory: [], treasure: [], kingdom: [], nonsupply: [] };

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

  async start() {
    [
      'Curse',
      'Copper',
      'Silver',
      'Gold',
      'Estate',
      'Duchy',
      'Province',
      'Bureaucrat',
      'Cellar',
      'Chapel',
      'CouncilRoom',
      'Festival',
      'Gardens',
      'Laboratory',
      'Library',
      'Market',
      'Militia',
      'Mine',
      'Moat',
      'Moneylender',
      'Remodel',
      'Smithy',
      'ThroneRoom',
      'Village',
      'Witch',
      'Workshop',
      'Courtyard',
      'Lurker',
      'Bandit',
      'Artisan',
      'Harbinger',
      'Merchant',
      'Poacher',
      'Sentry',
      'Baron',
      'Conspirator',
      'Courtier',
      'Diplomat',
      'Ironworks',
      'Mill',
      'MiningVillage',
      'Minion',
      'Patrol',
      'Swindler',
      'WishingWell',
      // 'Caravan',
      // 'FishingVillage',
      // 'Lookout',
      // 'Warehouse',
      // 'Cutpurse',
      // 'Ambassador',
      // 'Salvager',
      // 'Navigator',
      // 'Wharf',
      // 'MerchantShip',
      'Tactician',


    ].forEach((title) => {
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
        if (supply.cards.size === 0) numEmptySupplies++;
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
