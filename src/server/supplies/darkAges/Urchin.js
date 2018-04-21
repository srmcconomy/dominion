import Urchin from 'cards/darkAges/Urchin';
import SupplyFactory from '../SupplyFactory';

export default class UrchinSupply extends SupplyFactory(Urchin) {
  static getDependencies() {
    return ['Mercenary'];
  }
}
