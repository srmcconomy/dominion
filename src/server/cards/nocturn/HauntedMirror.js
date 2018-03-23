import Card from 'cards/Card';

export default class HauntedMirror extends Card {
  name = 'Haunted Mirror';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Treasure', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    event.cards.includes(this) &&
    player.hand.some(c => c.types.has('Action'));
  }

  async onTrigger(event, player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Action'),
      message: 'Select and Action card to discard for a Ghost'
    });

    if (card) {
      await player.discard(card);
      await player.gain('Ghost');
    }
  }
}
