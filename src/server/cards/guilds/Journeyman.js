import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Journeyman extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: () => true,
      message: 'Name a card',
    });
    const aside = new Pile();
    let cardsDrawn = 0;
    while ((cardsDrawn < 3) && (player.deck.size + player.discardPile.size > 0)) {
      const [card] = await player.draw(1, false);
      if (card.title === supply.title) {
        aside.push(card);
      } else {
        player.hand.push(card);
        cardsDrawn++;
      }
    }
    await player.discardAll([...aside], aside);
  }
}
