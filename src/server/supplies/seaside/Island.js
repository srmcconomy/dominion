import VictorySupplyFactory from 'supplies/VictorySupplyFactory';
import Island from 'cards/seaside/Island';
import Pile from 'utils/Pile';

export default class IslandSupply extends VictorySupplyFactory(Island) {
  setup(game) {
    game.players.forEach(player => {
      player.mats.island = new Pile();
    });
  }
}
