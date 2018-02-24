import Marauder from 'cards/darkAges/Marauder';
import SupplyFactory from '../SupplyFactory';

export default class MarauderSupply extends SupplyFactory(Marauder) {
  static getDependencies() {
    return ['Spoils'];
  }
}
