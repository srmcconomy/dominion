import Card from 'cards/Card';

export default class Bat extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Night']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    const cards = await player.selectCards({
      min: 0,
      max: 2,
      message: 'Select up to two cards to trash'
    });
    await player.trashAll([...cards]);
    if (cards.length > 0) {
      player.exchange(this, 'Vampire');
    }
  }
}
