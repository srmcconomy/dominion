import SupplyFactory from 'supplies/SupplyFactory';
import Pooka from 'cards/nocturn/Pooka';
import CursedGold from 'cards/nocturn/CursedGold';

export default class PookaSupply extends SupplyFactory(Pooka) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new CursedGold(game));
    });
  }
}
