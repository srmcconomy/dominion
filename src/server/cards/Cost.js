const FIELDS = ['coin', 'debt', 'potion'];

export default class Cost {
  coin = 0;
  debt = 0;
  potion = 0;

  constructor({ coin = 0, debt = 0, potion = 0 }) {
    this.coin = coin;
    this.debt = debt;
    this.potion = potion;
  }

  isGreaterThan(cost) {
    return FIELDS.every(field => this[field] >= cost[field]) && FIELDS.some(field => this[field] > (cost[field] || 0));
  }

  isLessThan(cost) {
    return FIELDS.every(field => this[field] <= cost[field]) && FIELDS.some(field => this[field] < (cost[field] || 0));
  }

  isGreaterThanEqualTo(cost) {
    return !this.isLessThan(cost);
  }

  isLessThanEqualTo(cost) {
    return !this.isGreaterThan(cost);
  }

  isEqualTo(cost) {
    return FIELDS.every(field => this[field] === (cost[field] || 0));
  }

  add(cost) {
    return new Cost({
      coin: this.coin + (cost.coin || 0),
      debt: this.debt + (cost.debt || 0),
      potion: this.potion + (cost.potion || 0),
    });
  }
}
