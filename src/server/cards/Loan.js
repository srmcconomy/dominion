import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Loan extends Card {
  static cost = 3;
  static types = new Set(['Treasure']);
  async onPlay(player) {
    player.money++;
    const revealedCards = new Pile();
    let treasureFound = false;
    while (!treasureFound) {
      const [card] = await player.draw(1, async card => {
        if (!card.types.has('Treasure')) {
          return revealedCards;
        }
        const choice = await player.selectOption(['Discard', 'Trash']);
        treasureFound = true;
        if (choice === 1) {
          return player.game.trash;
        }
        return player.discardPile;
      });
      if (treasureFound) {
        card
      }
      if (!card) {
        break;
      }
    }
    player.moveCard(revealedCards, player.discardPile, { num: revealedCards.size });
  }
}
