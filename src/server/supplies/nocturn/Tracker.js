import SupplyFactory from 'supplies/SupplyFactory';
import Tracker from 'cards/nocturn/Tracker';
import Pouch from 'cards/nocturn/Pouch';

export default class TrackerSupply extends SupplyFactory(Tracker) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new Pouch(game));
    });
  }
}
