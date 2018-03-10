
import SupplyFactory from 'supplies/SupplyFactory';
import Baker from 'cards/guilds/Baker';

export default class BakerSupply extends SupplyFactory(Baker) {
  setup(game) {
    game.players.forEach(player => {
      player.coinTokens++;
    });
  }
}
