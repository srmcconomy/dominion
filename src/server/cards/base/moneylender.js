import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Moneylender extends Card {
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: c => c.name === 'Copper', message: 'Choose a Copper card to trash' });
    if (card) {
      await player.trash(card);
      player.money += 3;
    }
  }
}
