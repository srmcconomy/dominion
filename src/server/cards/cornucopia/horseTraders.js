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

  canTriggerOn(event, player) {
    return event.name === 'play-first' && player !== event.triggeringPlayer && event.card.types.has('Attack') && player.hand.includes(this);
  }

  willTriggerOn(event, player, persistent) {
    return persistent === 'persistent' && event.name === 'start-of-turn' && event.triggeringPlayer === player && player.asidePile.includes(this);
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'play-first':
        player.setAside(this, player.hand);
        player.addPersistentEffect('start-of-turn', this);
        break;
      case 'start-of-turn':
        player.pickUp(this, player.asidePile);
        await player.draw(1);
        player.removePersistentEffect('start-of-turn', this);
        break;
      default:
        break;
    }
  }
}
