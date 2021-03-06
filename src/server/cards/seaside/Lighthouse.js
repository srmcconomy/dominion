import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Lighthouse extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    await player.actions++;
    player.money++;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return (
      (event.name === 'play-first' && event.card.types.has('Attack') && player !== event.triggeringPlayer && player.playArea.includes(this)) ||
      (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this))
    );
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'play-first':
        event.handledByPlayer.set(player, true);
        break;
      case 'start-of-turn':
        player.money++;
        this.ignoreCleanUp = false;
        break;
    }
  }
}
