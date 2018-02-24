import Tournament from 'cards/cornucopia/tournament';
import SupplyFactory from '../SupplyFactory';

export default class TournamentSupply extends SupplyFactory(Tournament) {
  static getDependencies() {
    return ['Prizes'];
  }
}
