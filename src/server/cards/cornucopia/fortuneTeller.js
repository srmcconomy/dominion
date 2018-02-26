import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class FortuneTeller extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      const aside = new Pile();
      while (other.deck.size + other.discardPile.size > 0) {
        const [card] = await other.draw(1, false);
        player.game.log(`${other.name} reveals ${card.title}`);
        if (card.types.has('Victory') || card.types.has('Curse')) {
          other.deck.push(card);
          break;
        } else {
          aside.push(card);
        }
      }

      await other.discardAll([...aside], aside);
    });
  }
}
