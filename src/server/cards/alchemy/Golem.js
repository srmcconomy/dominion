import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Golem extends Card {
  static cost = new Card.Cost({ coin: 4, potion: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const actionCards = new Pile(); // Pile containing first 2 actiosn revelaved
    const aside = new Pile(); // Pile of cards revealed while looking for actions
    while ((actionCards.length < 2) && (player.deck.size + player.discardPile.size > 0)) {
      const [card] = await player.draw(1, false);
      if (card.types.has('Action') && card.title !== 'Golem') {
        actionCards.push(card);
      } else aside.push(card);
    }
    await player.discardAll([...aside], aside);
    player.d = player.discardPile.size;
    while (actionCards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: actionCards,
        message: 'Play action'
      });
      await player.play(card, actionCards);
    }
  }
}
