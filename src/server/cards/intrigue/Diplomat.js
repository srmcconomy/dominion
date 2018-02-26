import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Diplomat extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(2);
    if (player.hand.size <= 5) {
      player.actions += 2;
    }
  }

  canTriggerOn(event, player) {
    return event.name === 'play-first' && event.card.types.has('Attack') && player !== event.triggeringPlayer && player.hand.includes(this) && player.hand.size >= 5;
  }

  async onTrigger(event, player) {
    await player.draw(2);
    const cards = await player.selectCards({
      min: 3,
      max: 3,
      message: 'Choose 3 cards to discard',
    });
    await player.discardAll([...cards]);
  }
}
