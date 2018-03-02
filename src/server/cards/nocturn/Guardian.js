import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Guardian extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Night', 'Duration']);
  async onPlay(player) {
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return (
      (event.name === 'play-first' && event.card.types.has('Attack') && player !== event.triggeringPlayer && player.playArea.includes(this)) ||
      (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this)) ||
      (event.name === 'would-gain' && event.card === this && event.triggeringPlayer === player)
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
      case 'would-gain':
        event.destination = player.hand;
        break;
    }
  }
}
