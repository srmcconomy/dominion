import Card from 'cards/Card';
import Deluded from 'cards/nocturn/Deluded';

export default class Delusion extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    if (!(player.states.some(s => s.title === 'Deluded') || player.states.some(s => s.title === 'Envious'))) {
      player.game.log(`${player.name} is Deluded`);
      player.states.push(new Deluded(player.game));
    }
  }
}
