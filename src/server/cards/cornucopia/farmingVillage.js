import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class FarmingVillage extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    const aside = new Pile();
    while (player.deck.size + player.discardPile.size > 0) {
      const [card] = await player.draw(1, false);
      player.game.log(`${player.name} reveals ${card.title}`);
      if (card.types.has('Action') || card.types.has('Treasure')) {
        player.hand.push(card);
        break;
      } else {
        aside.push(card);
      }
    }
    await aside.asyncForEach(card => player.discard(card));
  }
}
