
import SupplyFactory from 'supplies/SupplyFactory';
import Peasant from 'cards/adventures/Peasant';

export default class PeasantSupply extends SupplyFactory(Peasant) {
  static getDependencies() {
    return ['Soldier', 'Fugitive', 'Disciple', 'Teacher'];
  }
}
