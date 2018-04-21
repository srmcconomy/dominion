import Card from 'cards/Card';

export default class ScryingPool extends Card {
  name = 'Scrying Pool'
  static cost = new Card.Cost({ coin: 2, potion: 1 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.actions++;
    const [card] = player.lookAtTopOfDeck(1);
    if (card) {
      if (await player.pickCard(card, player.deck, 'Discard Card?')) {
        await player.discard(card, player.deck);
      }
    }
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      const [card2] = other.lookAtTopOfDeck(1);
      if (card2) {
        if (await other.pickCard(card2, other.deck, 'Discard Card?')) {
          await other.discard(card2, other.deck);
        }
      }
    });
    while (player.deck.length > 0 || player.discardPile.length > 0) {
      const cards = await player.draw(1);
      if (!cards.last().types.has('Action')) break;
    }
  }
}
