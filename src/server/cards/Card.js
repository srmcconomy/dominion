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

  getVpValue(player) {
    return this.VP;
  }

  getCost(player) {
    return { coin: 0, debt: 0, potion: 0, ...this.cost };
  }

  static init(player) { }

  static getDependencies(kingdomArray, game) { return []; }

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
  canTriggerOn(event) { return false; }
  willTriggerOn(event, cardLocation) { return false; }
  async onTrigger(event, cardLocation) { }
}
