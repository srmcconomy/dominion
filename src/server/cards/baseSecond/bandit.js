import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Bandit extends Card {
  static cost = 5;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.gain('Gold');
    await player.forEachOtherPlayer(async other => {
      const aside = new Pile();
      const cards = await other.draw(2, aside);

      if (aside.some(c => c.types.has('Treasure') && c.title !== 'Copper')) {
        const [card] = await player.selectCards({
          min: 1,
          max: 1,
          pile: aside.filter(c => c.types.has('Treasure') && c.title !== 'Copper'),
          message: 'Choose a card to trash'
        });
        if (card) {
          await other.trash(card, aside);
        }
      }

      for (let i = 0; i < aside.size; i++) {
        if (cards[i]) {
          await other.discard(cards[i], aside);
        }
      }
    });
  }
}
