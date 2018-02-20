import Pillage from 'cards/darkAges/Pillage';
import SupplyFactory from '../SupplyFactory';

export default class PillageSupply extends SupplyFactory(Pillage) {
  static getDependencies() {
    return ['Spoils'];
  }
}
