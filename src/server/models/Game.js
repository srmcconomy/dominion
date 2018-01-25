import 'supplies/basic';
import 'supplies/base';
import 'supplies/baseSecond';
import 'supplies/intrigue';
import 'supplies/intrigueFirst';
import 'supplies/seaside';
import 'supplies/cornucopia';
import 'supplies/adventures';
import Copper from 'cards/basic/Copper';
import Estate from 'cards/basic/Estate';
import Model from 'models/Model';
import DirtyModel, { trackDirty, DirtyMap } from 'utils/DirtyModel';
import Pile from 'utils/Pile';
import Supply from 'supplies/Supply';
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
  prizePile = new Pile();

  @trackDirty
  cards = [];

  @trackDirty(() => arr => arr.map(({ id }) => id))
  playerOrder = [];

  log = new Log();

  @trackDirty(() => player => player && player.id)
  currentPlayer = null;

  @trackDirty(viewer => () => viewer.id)
  ownID

  currentPlayerIndex = null;

  startingPlayerIndex = null;

  eventQueue = [];

  padding = 0;

  turnNumber = 1;

  getStateFor(player) {
    return { ...this.createDirty(player, true) };
  }

  getKingdomCards() {
    const kingdomSupplies = [...Supply.classes.values()].filter(S => S.category === 'kingdom');
    const suppliesTitles = [];
    while (suppliesTitles.length < 10) {
      suppliesTitles.push(kingdomSupplies.splice(
        Math.floor(Math.random() * kingdomSupplies.length),
        1,
      )[0].title);
    }
    if (false) {
      return suppliesTitles;
    }
    return [
      'Chapel',
      'Cellar',
      'Militia',
      'Moat',
      'Village',
      'CoinOfTheRealm',
      'NativeVillage',
      'PirateShip',
      'Island',
      'Page',
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
      const dependencies = Supply.classes.get(title).getDependencies(kingdomArray, this);
      dependencies.forEach(d => {
        if (!suppliesArray.includes(d)) {
          suppliesArray.push(d);
        }
      });
    });

    const potionGame = kingdomArray.some(title => Supply.classes.get(title).cost.potion);
    if (potionGame) suppliesArray.push('Potion');

    kingdomArray.forEach(c => suppliesArray.push(c));

    return suppliesArray;
  }

  endOfGame() {
    const scores = [];
    this.players.forEach(player => {
      player.score = player.vpTokens;
      player.endOfGameCleanUp();
      player.deck.forEach(c => {
        const cardScore = c.getVpValue(player);
        if (cardScore) {
          this.log(`${player.name}\'s ${c.title} is worth ${cardScore}`);
          console.log(`${player.name}\'s ${c.title} is worth ${cardScore}`);
        }
        player.score += cardScore;
      });
      this.log(`${player.name} has ${player.score} victory points`);
      console.log(`${player.name} has ${player.score} victory points`);
      scores.push({ player, name: player.name, score: player.score });
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
      const supply = new (Supply.classes.get(title))(this);
      supply.setup(this);
      this.supplies.set(title, supply);
      this.organizedSupplies[supply.category].push(title);
    });
    Object.keys(this.organizedSupplies).forEach(key => {
      this.organizedSupplies[key].sort((a, b) => (
        this.supplies.get(a).cost.coin - this.supplies.get(b).cost.coin
      ));
    });

    let reserveGame = false;
    this.supplies.forEach(s => {
      if (s.types.has('Reserve')) reserveGame = true;
    });

    this.players.forEach(player => {
      if (this.startingDeck) {
        console.log('starting deck');
        console.log(this.startingDeck());
        player.deck.push(...this.startingDeck());
        console.log(player.deck.map(c => c.title));
      } else {
        player.deck.push(
          ...Array(7).fill().map(() => new Copper(this)),
          ...Array(3).fill().map(() => new Estate(this)),
        );
        player.deck.shuffle();
      }

      if (reserveGame) {
        player.mats.tavern = new Pile();
      }
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
      if (player.socket) {
        player.socket.emit('state', this.getStateFor(player));
      }
    });
    this.clean();
    this.turnNumber = 1;
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
        if (supply.cards.size === 0 && supply.category !== 'nonSupply') {
          numEmptySupplies++;
        }
      });
      if (
        this.supplies.get('Province').cards.size === 0 ||
        (this.supplies.has('Colony') && this.supplies.get('Colony').cards.size === 0) ||
        numEmptySupplies >= (this.playerOrder.size > 4 ? 4 : 3)
      ) {
        this.endOfGame();
        break;
      }

      let additionalTurn = false;
      if (this.previousPlayer) {
        if (this.currentPlayer.id !== this.previousPlayer.id) {
          this.currentPlayer.playArea.forEach(c => {
            if (c.title === 'Outpost') additionalTurn = true;
          });
        }
      }
      if (additionalTurn === false) {
        this.currentPlayerIndex++;
      }

      if (this.currentPlayerIndex === this.players.size) {
        this.currentPlayerIndex = 0;
      }
      if (this.currentPlayerIndex === this.startingPlayerIndex && additionalTurn === false) {
        this.turnNumber++;
      }

      this.previousPlayer = this.currentPlayer;
      this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
    }
  }
}
