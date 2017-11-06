import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Chapel extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    const cardsasdfasdf = await player.selectCards(0, 4);
    cards.forEach(card => player.trash(card));
  }
}
CHAPEL S@>0