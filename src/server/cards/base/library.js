import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Library extends Card {
  static cost = 5;
  static types = new Set(['Action']);

  async onPlay(player) {
    const aside = new Pile();
    while ((player.hand.size < 7) && (player.deck.size + player.discardPile.size > 0)) {
      const [card] = await player.draw(1, false);
      if (card.types.has('Action')) {
        const choice = await player.selectOption([`Put ${card.title} in your hand`, `Set ${card.title} aside`]);
        [player.hand, aside][choice].push(card);
      } else {
        player.hand.push(card);
      }
    }
    await aside.asyncForEach(card => player.discard(card));
  }
}
