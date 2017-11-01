import Model from 'models/Model';

export default class Card extends Model {
  constructor(game, id) {
    if (typeof game === 'string') {
      id = game;
      game = null;
    }
    super(id);
    game && game.cards.push(this);
  }

  static from(id, name) {
    return new (Card.classes.get(name))(id);
  }
  static classes = new Map();
  static cost = 0;
  static value = null;
  static title = 'Card';
  static description = `This card hasn't been initialized`;
  static types = new Map();
  static image = '';
  static supplyCategory = 'kingdom';
  get cost() {
    return this.constructor.cost;
  }
  get value() {
    return this.constructor.value;
  }
  get title() {
    return this.constructor.title;
  }
  get description() {
    return this.constructor.description;
  }
  get types() {
    return this.constructor.types;
  }
  get image() {
    return this.constructor.image;
  }

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
  onPlay(game) { }
  onDraw(game) { }
  onDiscard(game) { }
  onTrash(game) { }
  onGain(game) { }
  onBuy(game) { }
}
