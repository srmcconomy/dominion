import Card from 'cards/Card';

export default class Cutpurse extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      if (other.hand.some(card => card.title === 'Copper')) {
        await other.discard(other.hand.find(card => card.title === 'Copper'));
      } else {
        other.revealHand();
      }
    });
  }
}
