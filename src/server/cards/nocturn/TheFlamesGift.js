import Card from 'cards/Card';

export default class TheFlamesGift extends Card {
  name = 'The Flame\'s Gift';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Select a card to trash'
    });
    if (card) await player.trash(card);
  }
}
