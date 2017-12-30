import Card from 'cards/Card';
import 'cards/basic';
import 'cards/base';
import 'cards/baseSecond';
import 'cards/intrigue';
import 'cards/intrigueFirst';
import 'cards/seaside';
import 'cards/cornucopia';
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

  @trackDirty(() => arr => arr.map(({ id }) => id))
  playerOrder = [];

  room = null;

  log = new Log();

  @trackDirty(() => player => player && player.id)
  currentPlayer = null;

  @trackDirty(viewer => () => viewer.id)
  ownID

  currentPlayerIndex = null;

  startingPlayerIndex = null;

  eventQueue = [];

  constructor(name, io) {
    super();
    console.log(this);
    console.log(Object.keys(this));
    this.room = io.to(this.id);
  }

  getStateFor(player) {
    return { ...this.createDirty(player, true) };
  }

  getKingdomCards() {
    const a = [];
    while (a.length < 10) {
      const unusedCards = [];
      Card.classes.forEach(c => {
        if (c.supplyCategory === 'kingdom' && !a.includes(c.title)) unusedCards.push(c.title);
      });
      a.push(unusedCards[Math.floor(Math.random() * unusedCards.length)]);
    }
    if (false) {
      return a;
    }
    return [
      'Chapel',
      'Cellar',
      'Militia',
      'Moat',
      'Village',
      'Merchant',
      'NativeVillage',
      'PirateShip',
      'Island',
    ];
  }

  getSupplyCards() {
    const suppliesArray = [
      'Curse',
      'Copper',
      'Silver',
      'Gold',
      'Estate',
      'Duchy',
      'Province'
    ];

    const kingdomArray = this.getKingdomCards();

    this.log('Kingdom Contains:');
    for (let i = 0; i < kingdomArray.length; i++) {
      this.log(`${kingdomArray[i]}`);
    }

    kingdomArray.forEach(title => {
      const dependancies = Card.classes.get(title).getDependencies(kingdomArray, this);
      dependancies.forEach(d => {
        if (!suppliesArray.includes(d)) {
          suppliesArray.push(d);
        }
      });
    });

    const potionGame = kingdomArray.some(title => Card.classes.get(title).cost.potion);
    if (potionGame) suppliesArray.push('Potion');

    kingdomArray.forEach(c => suppliesArray.push(c));

    return suppliesArray;
  }

  endOfGame() {
    const scores = [];
    this.players.forEach(player => {
      let score = player.vpTokens;
      player.endOfGameCleanUp();
      player.deck.forEach(c => {
        score += c.getVpValue(player);
      });
      this.log(`${player.name} has ${score} victory points`);
      console.log(`${player.name} has ${score} victory points`);
      scores.push({ player, name: player.name, score });
    });

    const hadExtraTurn = Array(this.playerOrder.length).fill(false);
    let tempIndex = this.startingPlayerIndex;
    for (;;) {
      hadExtraTurn[tempIndex] = true;
      if (tempIndex === this.currentPlayerIndex) break;
      tempIndex++;
      if (tempIndex === this.playerOrder.length) {
        tempIndex = 0;
      }
    }

    let winningScore = null;
    const winners = [];
    scores.forEach(s => {
      if (s.score > winningScore) winningScore = s.score;
    });
    scores.forEach(s => {
      if (s.score === winningScore) {
        winners.push({
          player: s.player,
          name: s.name,
          extraTurn: hadExtraTurn[this.playerOrder.indexOf(s.player)]
        });
      }
    });

    if (winners.length > 1) {
      let unequalTurns = false;
      winners.forEach(w => {
        if (w.extraTurn === false) unequalTurns = true;
      });
      if (unequalTurns) {
        winners.forEach(w => {
          if (w.extraTurn === true) winners.splice(winners.indexOf(w), 1);
        });
      }
      if (winners.length === 1) {
        this.log(`${winners[0].name} wins the game!!!`);
        console.log(`${winners[0].name} wins the game!!!`);
      } else {
        this.log('Tie game between:');
        console.log('Tie game between:');
        winners.forEach(w => {
          this.log(w.name);
          console.log(w.name);
        });
      }
    } else {
      this.log(`${winners[0].name} wins the game!!!`);
      console.log(`${winners[0].name} wins the game!!!`);
    }

    console.log('Scores:', scores);
    console.log('Winner:', winners);
  }

  async start() {
    this.getSupplyCards().forEach((title) => {
      console.log(title);
      this.supplies.set(title, new Supply(title, this));
      Card.classes.get(title).setup(this);
      this.organizedSupplies[Card.classes.get(title).supplyCategory].push(title);
    });
    Object.keys(this.organizedSupplies).forEach(key => {
      this.organizedSupplies[key].sort((a, b) => (
        this.supplies.get(a).cards.last().cost.coin - this.supplies.get(b).cards.last().cost.coin
      ));
    });
    this.players.forEach(player => {
      player.deck.push(
        ...Array(7).fill().map(() => new (Card.classes.get('Copper'))(this)),
        ...Array(3).fill().map(() => new (Card.classes.get('Estate'))(this)),
      );
      player.deck.shuffle();
      // player.init();
    });
    this.players.forEach(player => {
      this.playerOrder.push(player);
    });
    shuffle(this.playerOrder);
    this.currentPlayerIndex = Math.floor(Math.random() * this.playerOrder.length);
    this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
    this.startingPlayerIndex = this.currentPlayerIndex;
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
        this.endOfGame();
        break;
      }
      this.currentPlayerIndex++;
      if (this.currentPlayerIndex === this.players.size) {
        this.currentPlayerIndex = 0;
      }
      this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
    }
  }
}
