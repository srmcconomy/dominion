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

  static getNumberInSupply(game) {
    return 10;
  }

  static init(game) { }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
    };
  }

  async onPlay(game) { }
  async onDraw(game) { }
  async onDiscard(game) { }
  async onTrash(game) { }
  async onGain(game) { }
  async onBuy(game) { }
}
