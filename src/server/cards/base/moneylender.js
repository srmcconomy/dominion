import Card from 'cards/Card';
import { Set } from 'immutable';

export default class MoneyLender extends Card {
  // static title = 'MoneyLender';
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards(0, 1, card => card.name === 'Copper')
    if (card) {
    	player.trash(card);
    	player.money += 3;
    }
  }
}
