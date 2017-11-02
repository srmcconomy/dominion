import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Moneylender extends Card {
  name = 'Moneylender';
  cost = 4;
  types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.selectCard(0, 1, card => card.name === 'Copper')
    cards.forEach(player.trash(card));
    if (cards.size > 0) player.money += 3;
  }
}
