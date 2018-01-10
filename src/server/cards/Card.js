import BaseCard from 'cards/BaseCard';

const COST_FIELDS = ['coin', 'debt', 'potion'];

export default class Card extends BaseCard {
  ignoreCleanUp = false;
  static types = new Map();
  static VP = 0;

  constructor(game, supply) {
    super();
    if (game) game.cards.push(this);

    this.cost = {
      coin: 0,
      debt: 0,
      potion: 0,
      ...this.cost,
    };

    this.supply = supply;
  }

  getVpValue(player) {
    return this.VP;
  }

  getCost(player) {
    return { coin: 0, debt: 0, potion: 0, ...this.cost };
  }

  endGameCleanUp(player) { }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
    };
  }

  async onPlay(player) { }
  canTriggerOn(event) { return false; }
  willTriggerOn(event, cardLocation) { return false; }
  async onTrigger(event, cardLocation) { }

  static Cost = class Cost {
    coin = 0;
    debt = 0;
    potion = 0;

    constructor({ coin = 0, debt = 0, potion = 0 }) {
      this.coin = coin;
      this.debt = debt;
      this.potion = potion;
    }

    isGreaterThan(cost) {
      return COST_FIELDS.every(field => this[field] >= cost[field]) && COST_FIELDS.some(field => this[field] > (cost[field] || 0));
    }

    isLessThan(cost) {
      return COST_FIELDS.every(field => this[field] <= cost[field]) && COST_FIELDS.some(field => this[field] < (cost[field] || 0));
    }

    isGreaterThanEqualTo(cost) {
      return !this.isLessThan(cost);
    }

    isLessThanEqualTo(cost) {
      return !this.isGreaterThan(cost);
    }

    isEqualTo(cost) {
      return COST_FIELDS.every(field => this[field] === (cost[field] || 0));
    }

    add(cost) {
      return new Cost({
        coin: this.coin + (cost.coin || 0),
        debt: this.debt + (cost.debt || 0),
        potion: this.potion + (cost.potion || 0),
      });
    }
  }
}
