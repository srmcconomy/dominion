import Card from 'cards/Card';

export default class Goat extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Treasure', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Select a card to trash'
    });
    if (card) await player.trash(card);
  }
}
