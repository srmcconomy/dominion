import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Diplomat extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(2);
    if (player.hand.size <= 5) {
      player.actions += 2;
    }
  }

  shouldReactTo(event, player) {
    return event === 'attack' && player.hand.size >= 5;
  }

  async reactTo(event, player) {
    await player.draw(2);
    const cards = await player.selectCards({
      min: 3,
      max: 3,
      message: 'Choose 3 cards to discard',
    });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
  }
}
