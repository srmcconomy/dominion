import Hermit from 'cards/darkAges/Hermit';
import SupplyFactory from '../SupplyFactory';

export default class HermitSupply extends SupplyFactory(Hermit) {
  static getDependencies() {
    return ['Madman'];
  }
}
