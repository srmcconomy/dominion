import Card from 'cards/Card';

export default class Beggar extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    for (let i = 0; i < 3; i++) {
      await player.gain('Copper', player.hand);
    }
  }

  canTriggerOn(event, player) {
    return event.name === 'play-first' && player !== event.triggeringPlayer && event.card.types.has('Attack') && player.hand.includes(this);
  }

  async onTrigger(event, player) {
    await player.discard(this);
    await player.gain('Silver', player.deck);
    await player.gain('Silver');
  }
}
