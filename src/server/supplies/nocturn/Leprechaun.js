import Leprechaun from 'cards/nocturn/Leprechaun';
import SupplyFactory from '../SupplyFactory';

export default class LeprechaunSupply extends SupplyFactory(Leprechaun) {
  static getDependencies() {
    return ['Wish'];
  }
}
