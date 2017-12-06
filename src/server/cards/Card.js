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

  static costsLessThanEqualTo(cost) {
    return (
      cost.coin ? this.cost.coin <= cost.coin : false &&
      cost.debt ? this.cost.debt <= cost.debt : false &&
      cost.potion ? this.cost.potion <= cost.potion : false
      );
  }

  static costsEqualTo(cost) {
    return (
      cost.coin ? this.cost.coin === cost.coin : this.cost.coin === 0 &&
      cost.debt ? this.cost.debt === cost.debt : this.cost.debt === 0 &&
      cost.potion ? this.cost.potion === cost.potion : this.cost.potion === 0
      );
  }

  static init(player) { }

  static setup(kingdomArray, game) { return []; }

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
