import Card from 'cards/Card';

export default class Famine extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const cards = await player.draw(3, false);
    player.game.log(`${player.name} reveals ${cards.map(c => c.name).join(', ')}`);
    while (cards.length > 0) {
      const card = cards.last();
      if (card.types.has('Action')) {
        await player.discard(card, cards);
      } else {
        await player.topDeck(card, cards);
      }
    }
    player.deck.shuffle();
  }
}
