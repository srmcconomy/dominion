import DevilsWorkshop from 'cards/nocturn/DevilsWorkshop';
import SupplyFactory from '../SupplyFactory';

export default class DevilsWorkshopSupply extends SupplyFactory(DevilsWorkshop) {
  static getDependencies() {
    return ['Imp'];
  }
}
