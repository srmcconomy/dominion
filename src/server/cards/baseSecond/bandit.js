import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Bandit extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.gain('Gold');
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', player, this)) {
        return;
      }
      const cards = await other.lookAtTopOfDeck(2);
      player.game.log(`${other.name} reveals ${cards.map(c => c.title).join(', ')}`)


      if (cards.some(c => c.types.has('Treasure') && c.title !== 'Copper')) {
        const cardsInspected = new Pile();
        for(let i = 0; i < cards.length; i++) {
          cardsInspected.push(cards[i]);
        }
        const [card] = await player.selectCards({
          min: 1,
          max: 1,
          pile: cardsInspected.filter(c => c.types.has('Treasure') && c.title !== 'Copper'),
          message: 'Choose a card to trash'
        });
        if (card) {
          await other.trash(card, other.deck);
          cardsInspected.delete(card);
        }
        cardsInspected.forEach(c => {
          other.discard(c, other.deck);
        });
      }
    });
  }
}
