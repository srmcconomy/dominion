import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Library extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);

  async onPlay(player) {
    const aside = new Pile();
    while ((player.hand.size < 7) && (player.deck.size + player.discardPile.size > 0)) {
      const [card] = await player.lookAtTopOfDeck(1);
      if (card) {
        if (card.types.has('Action')) {
          if (await player.pickCard(card, player.deck, 'Put into hand?')) {
            await player.moveCard(card, player.deck, player.hand);
          } else {
            player.moveCard(card, player.deck, aside);
          }
        } else {
          player.moveCard(card, player.deck, player.hand);
        }
      }
    }
    await player.discardAll([...aside], aside);
  }
}
