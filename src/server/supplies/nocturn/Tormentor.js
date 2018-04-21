import Tormentor from 'cards/nocturn/Tormentor';
import SupplyFactory from '../SupplyFactory';

export default class PillageSupply extends SupplyFactory(Tormentor) {
  static getDependencies() {
    return ['Imp'];
  }
}
