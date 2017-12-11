import Card from 'cards/Card';

export default class Cutpurse extends Card {
  static cost = {coin:4};
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', other, this)) {
        return;
      }
      if (other.hand.some(card => card.title === 'Copper')) {
        for (let i = 0; i < other.hand.size; i++) {
          if (other.hand.list[i].title === 'Copper') {
            other.discard(other.hand.list[i]);
            break;
          }
        }
      } else {
        // other.revealHand();
      }
    });
  }
}
