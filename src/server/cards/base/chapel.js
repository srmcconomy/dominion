import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Chapel extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.selectCards({ min: 0, max: 4, message: 'Choose up to 4 cards to trash' });
    cards.forEach(async card => await player.trash(card));
  }
}
