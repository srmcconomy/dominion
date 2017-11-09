import Card from 'cards/Card';
import { Set } from 'immutable';

export default class MoneyLender extends Card {
  // static title = 'MoneyLender';
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: card => card.name === 'Copper', message: 'Choose a Copper card to trash' })
    if (card) {
    	player.trash(card);
    	player.money += 3;
    }
  }
}
