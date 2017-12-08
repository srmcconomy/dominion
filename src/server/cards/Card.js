import BaseCard from 'cards/BaseCard';

export default class Card extends BaseCard {
  constructor(game, id) {
    if (typeof game === 'string') {
      id = game;
      game = null;
    }
    super(id);
    if (game) game.cards.push(this);

    this.cost = {
      coin: 0,
      debt: 0,
      potion: 0,
      ...this.cost,
    };
  }

  static types = new Map();
  static supplyCategory = 'kingdom';
  static VP = 0;

  static getNumberInSupply(game) {
    return 10;
  }

  static getVpValue(player) {
    return this.VP;
  }

  static getCost(player) {
    return this.cost;
  }

  static costsLessThanEqualTo(cost) {
    const tempCost = {coin:0, debt:0, potion:0, ...this.getCost()}; //constructor isn't initialized yet
    return (
      (cost.coin ? tempCost.coin <= cost.coin : false) &&
      (cost.debt ? tempCost.debt <= cost.debt : false) &&
      (cost.potion ? tempCost.potion <= cost.potion : false)
      );
  }

  static costsEqualTo(cost) {
    const tempCost = {coin:0, debt:0, potion:0, ...this.getCost()}; //constructor isn't initialized yet
    return (
      (cost.coin ? tempCost.coin === cost.coin : tempCost.coin === 0) &&
      (cost.debt ? tempCost.debt === cost.debt : tempCost.debt === 0) &&
      (cost.potion ? tempCost.potion === cost.potion : tempCost.potion === 0)
      );
  }

  static init(player) { }

  static addDependancies(kingdomArray, game) { return []; }

  static setup(game) { }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
    };
  }

  async onPlay(player) { }
  async onDraw(player) { }
  async onDiscard(player) { }
  async onTrash(player) { }
  async onGain(player) { }
  async onBuy(player) { }
  async onAttacked(player) { }
  shouldReactTo(event) { return false; }
  async reactTo(event) { }
}
