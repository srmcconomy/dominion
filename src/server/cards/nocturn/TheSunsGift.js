import Card from 'cards/Card';

export default class TheSunsGift extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const cards = player.draw(4, false);
    const cards2 = await player.selectCards({
      min: 0,
      max: cards.length,
      pile: cards,
      message: 'Select cards to discard'
    });
    await player.discardAll([...cards2], cards);
    while (cards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cards,
        message: 'Select a card to place on top fo your deck'
      });
      player.topDeck(card, cards);
    }
  }
}
