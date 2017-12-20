import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class FortuneTeller extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', player, this)) {
        return;
      }
      const aside = new Pile();
      while (player.deck.size + player.discardPile.size > 0) {
        const [card] = await player.draw(1, false);
        player.game.log(`${other.name} reveals ${card.title}`);
        if (card.types.has('Victory') || card.types.has('Curse')) {
          other.deck.push(card);
          break;
        } else {
          aside.push(card);
        }
      }
      await aside.asyncForEach(card => other.discard(card));
    });
  }
}
