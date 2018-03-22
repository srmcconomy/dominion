import Card from 'cards/Card';

export default class Idol extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Treasure', 'Attack', 'Fate']);
  async onPlay(player, event) {
    player.money += 2;
    if (player.playArea.filter(c => c.title === 'Idol').length % 2 === 1) {
      await player.takeBoon();
    } else {
      await player.forEachOtherPlayer(async other => {
        if (event.handledByPlayer.get(other)) {
          return;
        }
        await other.gain('Curse');
      });
    }
  }
}
