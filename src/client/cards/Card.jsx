import BaseCard from 'cards/BaseCard';

const fullImages = require.context('assets/images/cards/art/full', true);
const normalImages = require.context('assets/images/cards/art/normal', true);

export default class Card extends BaseCard {
  image = {
    normal: this.constructor.fullArt ? (fullImages.keys().includes(`./${this.constructor.name}.jpg`) ? fullImages(`./${this.constructor.name}.jpg`) : fullImages(`./Default.jpg`)) : (normalImages.keys().includes(`./${this.constructor.name}.jpg`) ? normalImages(`./${this.constructor.name}.jpg`) : normalImages(`./Default.jpg`)),
    small: normalImages.keys().includes(`./${this.constructor.name}.jpg`) ? normalImages(`./${this.constructor.name}.jpg`) : normalImages(`./Default.jpg`),
  };

  static description = "This card hasn't been initialized";
}
