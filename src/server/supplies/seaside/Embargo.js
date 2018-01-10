import SupplyFactory from 'supplies/SupplyFactory';
import Embargo from 'cards/seaside/Embargo';

export default class EmbargoSupply extends SupplyFactory(Embargo) {
  setup(game) {
    const exampleCard = new Embargo(game);
    game.players.forEach(player => {
      player.addPersistentEffect('buy', exampleCard);
    });
  }
}
