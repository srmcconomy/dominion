import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Scout extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = player.draw(4, false);
    cards.filter(c => c.types.has('Victory')).forEach(c => {
      player.moveCard(c, cards, player.hand);
    });
    while (cards.size > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cards,
        message: 'Select Card to put on top of deck'
      });
      player.topDeck(card, cards);
    }
  }
}
