import SupplyFactory from 'supplies/SupplyFactory';
import SecretCave from 'cards/nocturn/SecretCave';
import MagicLamp from 'cards/nocturn/MagicLamp';

export default class SecretCaveSupply extends SupplyFactory(SecretCave) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new MagicLamp(game));
    });
  }
  static getDependencies() {
    return ['Wish'];
  }
}
