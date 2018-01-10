import SupplyFactory from 'supplies/SupplyFactory';
import PirateShip from 'cards/seaside/PirateShip';

export default class PirateShipSupply extends SupplyFactory(PirateShip) {
  setup(game) {
    game.players.forEach(player => {
      player.mats.pirateShip = 0;
    });
  }
}
