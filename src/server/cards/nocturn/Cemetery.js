import Card from 'cards/Card';

export default class Cemetery extends Card {
  static VP = 2;
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Victory']);

  willTriggerOn(event, player) {
    return event.name === 'gain' &&
     event.card === this &&
     event.triggeringPlayer === player;
  }

  async onTrigger(event, player) {
    const cards = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Select up to 4 cards to trash'
    });
    await player.trashAll([...cards]);
  }
}
