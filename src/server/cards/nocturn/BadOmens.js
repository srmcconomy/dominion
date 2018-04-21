import Card from 'cards/Card';

export default class BadOmens extends Card {
  name = 'Bad Omens';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    player.moveCard(player.deck, player.discardPile, { num: player.deck.size });
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      predicate: c => c.title === 'Copper',
      pile: player.discardPile,
      message: 'Put two coppers onto your deck'
    });
    if (cards.length !== 2) {
      player.game.log(`${player.name} reveals discard pile of ${player.discardPile.map(c => c.name).join(', ')}`);
    }
    for (const card of cards) {
      player.topDeck(card, player.discardPile);
    }
  }
}
