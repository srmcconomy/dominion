import Model from 'models/Model';

const fullImages = require.context('assets/images/cards/art/full', true);
const normalImages = require.context('assets/images/cards/art/normal', true);

export default class Card extends Model {
  image = {
    normal: this.constructor.fullArt ? fullImages(`./${this.constructor.name}.jpg`) : normalImages(`./${this.constructor.name}.jpg`),
    small: normalImages(`./${this.constructor.name}.jpg`),
  };
  get title() {
    return this.constructor.title || this.constructor.name;
  }
  get description() {
    return this.constructor.description;
  }
  get value() {
    return this.constructor.value;
  }
  get cost() {
    return this.constructor.cost;
  }
  get fullArt() {
    return this.constructor.fullArt;
  }
  get types() {
    return this.constructor.types;
  }
  static from(id, name) {
    return new (Card.classes.get(name))(id);
  }
  static classes = new Map();
}
