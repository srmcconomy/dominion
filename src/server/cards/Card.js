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
      coin: typeof(this.cost.coin) === 'undefined' ? 0 : this.cost.coin,
      debt: typeof(this.cost.debt) === 'undefined' ? 0 : this.cost.debt,
      potion: typeof(this.cost.potion) === 'undefined' ? 0 : this.cost.potion
      };
  }

  static types = new Map();
  static supplyCategory = 'kingdom';
  static bane = false;
  static dependancies = new Map();
  static VP = 0;

  static getNumberInSupply(game) {
    return 10;
  }

  static getVpValue(player) {
    return this.VP;
  }

  static costsLessThanEqualTo(cost) {
    return (
      typeof(cost.coin) === 'undefined' ? true : this.cost.coin <= cost.coin &&
      typeof(cost.debt) === 'undefined' ? true : this.cost.debt <= cost.debt &&
      typeof(cost.potion) === 'undefined' ? true : this.cost.potion <= cost.potion
      );
  }

  static costsEqualTo(cost) {
    return (
      this.cost.coin === (typeof(cost.coin) === 'undefined' ? 0 : cost.coin) &&
      this.cost.debt === (typeof(cost.debt) === 'undefined' ? 0 : cost.debt) &&
      this.cost.potion === (typeof(cost.potion) === 'undefined' ? 0 : cost.potion)
      );
  }

  static init(player) { }

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
