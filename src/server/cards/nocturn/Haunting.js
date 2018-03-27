import Card from 'cards/Card';

export default class Haunting extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    if (player.hand.length >= 4) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        message: 'Select a card to place on top of your deck'
      });
      if (card) await player.topDeck(card);
    }
  }
}
