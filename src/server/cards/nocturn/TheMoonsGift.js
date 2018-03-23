import Card from 'cards/Card';

export default class TheMoonsGift extends Card {
  name = 'The Moon\'s Gift';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      pile: player.discardPile,
      message: 'Choose a card to place on top of your deck'
    });
    if (card) player.topDeck(card, player.discardPile);
  }
}
