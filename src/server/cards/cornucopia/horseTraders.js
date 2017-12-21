import Card from 'cards/Card';
import { Set } from 'immutable';

export default class HorseTraders extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    player.buys++;
    player.money += 3;
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      message: 'Select cards to discard'
    });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
  }

  shouldReactTo(event, player) {
    return event === 'attack';
  }

  async reactTo(event, player) {
    player.setAside(this, player.hand);
  }

  async onTurnStart(player) {
    player.pickUp(this, player.asidePile);
    await player.draw(1);
  }
}
