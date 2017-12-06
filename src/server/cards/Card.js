import BaseCard from 'cards/BaseCard';

export default class Card extends BaseCard {
  constructor(game, id) {
    if (typeof game === 'string') {
      id = game;
      game = null;
    }
    super(id);
    if (game) game.cards.push(this);
  }

  static cost = 0;
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
