import YoungWitch from 'cards/cornucopia/YoungWitch';
import SupplyFactory from '../SupplyFactory';
import Supply from '../Supply';

export default class YoungWitchSupply extends SupplyFactory(YoungWitch) {
  static getDependencies(kingdomArray, game) {
    const dependencies = [];
    const possibleBanes = [];
    Supply.classes.forEach(c => {
      const tempCost = { coin: 0, debt: 0, potion: 0, ...c.cost };
      if (
        c.title &&
        (tempCost.coin === 2 || tempCost.coin === 3) &&
        !tempCost.debt &&
        !tempCost.potion &&
        !kingdomArray.includes(c.title) &&
        c.category === 'kingdom'
      ) {
        possibleBanes.push(c);
      }
    });
    YoungWitch.bane = possibleBanes[Math.floor(Math.random() * possibleBanes.length)];
    game.log(`${YoungWitch.bane.title} is Young Witch's Bane`);
    dependencies.push(YoungWitch.bane.title);
    dependencies.push(...YoungWitch.bane.getDependencies(kingdomArray, game));
    return dependencies;
  }
}
