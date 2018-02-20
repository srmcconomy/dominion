import Card from 'cards/Card';

export default class Scavenger extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    const choice = await player.selectOption(['Put deck into discard pile', 'Don\'t']);
    if (choice === 0) {
      while (player.deck.length) {
        player.moveCard(player.deck.last(), player.deck, player.discardPile);
      }
    }
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      pile: player.discardPile,
      message: 'Choose card to place on top of deck'
    });
    if (card) {
      await player.topDeck(card, player.discardPile);
    }
  }
}
