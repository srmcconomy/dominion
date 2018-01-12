import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Sage extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;

    const aside = new Pile();
    while (player.deck.size + player.discardPile.size > 0) {
      const [card] = await player.draw(1, false);
      player.game.log(`${player.name} reveals ${card.title}`);
      if (player.costsMoreThanEqualTo(card, { coin: 3 })) {
        player.hand.push(card);
        break;
      } else {
        aside.push(card);
      }
    }
    await aside.asyncForEach(card => player.discard(card));
  }
}
