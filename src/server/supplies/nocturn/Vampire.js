import Vampire from 'cards/nocturn/Vampire';
import SupplyFactory from '../SupplyFactory';

export default class PillageSupply extends SupplyFactory(Vampire) {
  static getDependencies() {
    return ['Bat'];
  }
}
