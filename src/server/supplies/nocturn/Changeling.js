import SupplyFactory from 'supplies/SupplyFactory';
import Changeling from 'cards/nocturn/Changeling';

export default class ChangelingSupply extends SupplyFactory(Changeling) {
  setup(game) {
    this.card = new Changeling(game);
    game.players.forEach(p => {
      p.addPersistentEffect('gain', this.card);
    });
  }
}
