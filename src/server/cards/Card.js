import BaseCard from 'cards/BaseCard';

const COST_FIELDS = ['coin', 'debt', 'potion'];

export default class Card extends BaseCard {
  ignoreCleanUp = false;
  timesPlayed = 0;
  static types = new Map();
  static VP = 0;

  constructor(game, supply) {
    super();
    if (game) game.cards.push(this);

    this.supply = supply;
  }

  getVpValue(player) {
    return this.VP;
  }

  endGameCleanUp(player) { }

  updateIgnoreCleanUp() { }

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
      return this.isGreaterThanEqualTo(cost) && COST_FIELDS.some(field => this[field] > (cost[field] || 0));
    }

    isLessThan(cost) {
      return this.isLessThanEqualTo(cost) && COST_FIELDS.some(field => this[field] < (cost[field] || 0));
    }

    isGreaterThanEqualTo(cost) {
      return COST_FIELDS.every(field => this[field] >= (cost[field] || 0));
    }

    isLessThanEqualTo(cost) {
      return COST_FIELDS.every(field => this[field] <= (cost[field] || 0));
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

    subtract(cost) {
      return new Cost({
        coin: this.coin - (cost.coin || 0),
        debt: this.debt - (cost.debt || 0),
        potion: this.potion - (cost.potion || 0),
      });
    }
  }
}
