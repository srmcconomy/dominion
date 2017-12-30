import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Moat extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(2);
  }

  canTriggerOn(event, player) {
    return event.name === 'play' && player !== event.triggeringPlayer && event.card.types.has('Attack') && player.hand.includes(this);
  }

  async onTrigger(event, player) {
    event.handledByPlayer.set(player, true);
  }
}
