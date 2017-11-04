import Model from 'models/Model';

const fullImages = require.context('assets/images/cards/art/full', true);
const normalImages = require.context('assets/images/cards/art/normal', true);

export default class Card extends Model {
  image = {
    normal: this.constructor.fullArt ? fullImages(`./${this.constructor.name}.jpg`) : normalImages(`./${this.constructor.name}.jpg`),
    small: normalImages(`./${this.constructor.name}.jpg`),
  };

  constructor(...args) {
    super(...args);
    return new Proxy(this, {
      get(target, prop) {
        return target[prop] || target.constructor[prop];
      }
    });
  }
  static from(id, name) {
    return new (Card.classes.get(name))(id);
  }
  static classes = new Map();
}
