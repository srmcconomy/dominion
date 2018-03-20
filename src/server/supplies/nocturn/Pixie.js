import SupplyFactory from 'supplies/SupplyFactory';
import Pixie from 'cards/nocturn/Pixie';
import Goat from 'cards/nocturn/Goat';

export default class PixieSupply extends SupplyFactory(Pixie) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new Goat(game));
    });
  }
}
