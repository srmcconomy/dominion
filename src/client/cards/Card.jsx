import BaseCard from 'cards/BaseCard';

const fullImages = require.context('assets/images/cards/art/full', true);
const normalImages = require.context('assets/images/cards/art/normal', true);

export default class Card extends BaseCard {
  image = {
    normal: this.constructor.fullArt ? fullImages(`./${this.constructor.name}.jpg`) : normalImages(`./${this.constructor.name}.jpg`),
    small: normalImages(`./${this.constructor.name}.jpg`),
  };

  static description = "This card hasn't been initialized";
}
