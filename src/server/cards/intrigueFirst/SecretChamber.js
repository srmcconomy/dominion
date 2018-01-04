import Card from 'cards/Card';
import { Set } from 'immutable';

export default class SecretChamber extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    const cards = await player.selectCards({
      min: 0,
      max: player.hand.length,
      message: 'Select cards to discard'
    });
    if (cards) {
      for (let i = 0; i < cards.length; i++) {
        await player.discard(cards[i]);
      }
      player.money += cards.length;
    }
  }

  canTriggerOn(event, player) {
    return event.name === 'play-first' && player !== event.triggeringPlayer && event.card.types.has('Attack') && player.hand.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(2);
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      message: 'Choose 2 cards to place on top of your deck',
    });
    for (let i = 0; i < cards.length; i++) {
      await player.topDeck(cards[i]);
    }
  }
}
