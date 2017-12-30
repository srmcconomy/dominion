import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Scout extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const cardsInspected = new Pile();
    player.actions++;
    const cards = player.lookAtTopOfDeck(4);
    cards.forEach(c => {
      if (c.types.has('Victory')) {
        player.moveCard(c, player.deck, player.hand);
      } else {
        cardsInspected.push(c);
      }
    });
    while (cardsInspected.size > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cardsInspected,
        message: 'Select Card to put on top of deck'
      });
      player.topDeck(card, player.deck);
      cardsInspected.delete(card);
    }
  }
}
