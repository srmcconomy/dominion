import Card from 'cards/Card';
import Envious from 'cards/nocturn/Envious';

export default class Envy extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    if (!(player.states.some(s => s.title === 'Deluded') || player.states.some(s => s.title === 'Envious'))) {
      player.game.log(`${player.name} is Envious`);
      player.states.push(new Envious(player.game));
    }
  }
}
