import SupplyFactory from 'supplies/SupplyFactory';
import Cemetery from 'cards/nocturn/Cemetery';
import HauntedMirror from 'cards/nocturn/HauntedMirror';

export default class CemeterySupply extends SupplyFactory(Cemetery) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new HauntedMirror(game));
    });
  }
  static getDependencies() {
    return ['Ghost'];
  }
}
