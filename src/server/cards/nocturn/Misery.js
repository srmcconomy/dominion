import Card from 'cards/Card';
import Miserable from 'cards/nocturn/Miserable';
import TwiceMiserable from 'cards/nocturn/TwiceMiserable';

export default class Misery extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const miserable = player.states.find(s => s.title === 'Miserable');
    const twiceMiserable = player.states.find(s => s.title === 'TwiceMiserable');

    if (!(miserable) && !(twiceMiserable)) {
      player.states.push(new Miserable(player.game));
      player.game.log(`${player.name} is Miserable`);
    } else if (miserable) {
      player.states.push(new TwiceMiserable(player.game));
      player.states.delete(miserable);
      player.game.log(`${player.name} is Twice Miserable`);
    }

  }}
