import SupplyFactory from 'supplies/SupplyFactory';
import Shepherd from 'cards/nocturn/Shepherd';
import Pasture from 'cards/nocturn/Pasture';

export default class ShepherdSupply extends SupplyFactory(Shepherd) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new Pasture(game));
    });
  }
}
