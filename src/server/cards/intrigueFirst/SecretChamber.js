import Card from 'cards/Card';
import { Set } from 'immutable';

export default class SecretChamber extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    const cards = await player.selectCards({
      min: 0,
      max: player.hand.length,
      message: 'Select cards to discard'
    });

    player.money += cards.length;
    await player.discardAll([...cards]);
  }

  canTriggerOn(event, player) {
    return event.name === 'play-first' && player !== event.triggeringPlayer && event.card.types.has('Attack') && player.hand.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(2);
    for (let i = 0; i < 2; i++) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        message: `Select ${i === 0 ? 'first' : 'second'} card to put on your deck`,
      });
      await player.topDeck(card);
    }
  }
}
