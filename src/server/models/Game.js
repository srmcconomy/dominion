import 'supplies/basic';
import 'supplies/base';
import 'supplies/baseSecond';
import 'supplies/intrigue';
import 'supplies/intrigueFirst';
import 'supplies/seaside';
import 'supplies/cornucopia';
import 'supplies/adventures';
import 'supplies/guilds';
import 'supplies/darkAges';
import 'supplies/nocturn';
import 'supplies/alchemy';
import 'supplies/promo';
import Estate from 'cards/basic/Estate';
import Hovel from 'cards/darkAges/Hovel';
import Necropolis from 'cards/darkAges/Necropolis';
import OvergrownEstate from 'cards/darkAges/OvergrownEstate';

import fateSetup from 'utils/FateSetup';
import hexSetup from 'utils/HexSetup';

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
  organizedSupplies = { victory: [], treasure: [], treasure2: [], kingdom: [], nonSupply: [] };

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
    const blackList = ['Bridge', 'Highway', 'Tournament', 'BandOfMisfits', 'BridgeTroll', 'Quarry', 'Peddler', 'Rogue', 'Saboteur', 'Knights', 'Talisman', 'Possession', 'Knights'];
    const kingdomSupplies = [...Supply.classes.values()].filter(S => S.category === 'kingdom' && !blackList.includes(S.title));
    const suppliesTitles = [];
    while (suppliesTitles.length < 10) {
      suppliesTitles.push(kingdomSupplies.splice(
        Math.floor(Math.random() * kingdomSupplies.length),
        1,
      )[0].title);
    }
    if (true) {
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
      'Monastery',
      'SecretCave',
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

    kingdomArray.forEach(c => suppliesArray.push(c));

    suppliesArray.forEach(title => {
      const dependencies = Supply.classes.get(title).getDependencies(suppliesArray, this);
      dependencies.forEach(d => {
        if (!suppliesArray.includes(d)) {
          suppliesArray.push(d);
        }
      });
    });

    const potionGame = suppliesArray.some(title => Supply.classes.get(title).cost.potion);
    if (potionGame) suppliesArray.push('Potion');

    const looterGame = suppliesArray.some(title => Supply.classes.get(title).types.has('Looter'));
    if (looterGame) suppliesArray.push('Ruins');

    const fateGame = suppliesArray.some(title => Supply.classes.get(title).types.has('Fate'));
    if (fateGame) {
      if (!suppliesArray.includes('WillOWisp')) suppliesArray.push('WillOWisp');
      fateSetup(this);
    }

    const doomGame = suppliesArray.some(title => Supply.classes.get(title).types.has('Doom'));
    if (doomGame) {
      hexSetup(this);
    }

    return suppliesArray;
  }

  endOfGame() {
    const scores = [];
    this.players.forEach(player => {
      scores.push(player.calculateScore(true));
    });
    this.log('\u00A0');

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
      if (s.score >= winningScore) winningScore = s.score;
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
      const supply = new (Supply.classes.get(title))(this);
      supply.setup(this);
      this.supplies.set(title, supply);
      this.organizedSupplies[supply.category].push(title);
    });
    Object.keys(this.organizedSupplies).forEach(key => {
      this.organizedSupplies[key].sort((a, b) => {
        if (this.supplies.get(a).cost.coin === this.supplies.get(b).cost.coin)
        {
          if (this.supplies.get(a).title < this.supplies.get(b).title) {
            return -1;
          } else if (this.supplies.get(a).title > this.supplies.get(b).title) {
            return 1;
          }
          return 0;
        }
        return this.supplies.get(a).cost.coin - this.supplies.get(b).cost.coin;
      });
    });

    let reserveGame = false;
    this.supplies.forEach(s => {
      if (s.types.has('Reserve')) reserveGame = true;
    });

    let fateGame = false;
    this.supplies.forEach(s => {
      if (s.types.has('Fate')) fateGame = true;
    });

    const darkAges = require.context('cards/darkAges', true);
    let supplyCount = 0;
    let darkAgesCount = 0;
    this.supplies.forEach(s => {
      if (s.category === 'kingdom') {
        supplyCount++;
        if (darkAges.keys().includes(`./${s.title}`)) darkAgesCount++;
      }
    });

    const sheltersGame = Math.random() < darkAgesCount / (supplyCount || 1);

    this.players.forEach(player => {
      if (this.startingDeck) {
        console.log('starting deck');
        console.log(this.startingDeck());
        player.deck.push(...this.startingDeck());
        console.log(player.deck.map(c => c.title));
      } else {
        while (player.deck.length < 7) {
          player.moveCard(this.supplies.get('Copper').cards.last(), this.supplies.get('Copper').cards, player.deck);
        }
        if (sheltersGame) {
          player.deck.push(new Hovel(this));
          player.deck.push(new Necropolis(this));
          player.deck.push(new OvergrownEstate(this));
        } else player.deck.push(...Array(3).fill().map(() => new Estate(this)));
        player.deck.shuffle();
      }

      if (reserveGame) player.mats.tavern = new Pile();
      if (fateGame) player.boonPile = new Pile();
      player.cardsOwned.push(...player.deck);
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
    this.turnId = 0;
    for (;;) {
      this.turnId++;
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
        await this.currentPlayer.selectOption(['1', '2'], 'Don\'t click, just here to force score logging');
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
