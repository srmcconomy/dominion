import Exorcist from 'cards/nocturn/Exorcist';
import SupplyFactory from '../SupplyFactory';

export default class ExorcistSupply extends SupplyFactory(Exorcist) {
  static getDependencies() {
    return ['WillOWisp', 'Imp', 'Ghost'];
  }
}
