import BanditCamp from 'cards/darkAges/BanditCamp';
import SupplyFactory from '../SupplyFactory';

export default class BanditCampSupply extends SupplyFactory(BanditCamp) {
  static getDependencies() {
    return ['Spoils'];
  }
}
