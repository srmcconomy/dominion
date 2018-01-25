import Card from 'cards/Card';

export default class Witch extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.draw(2);
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.gain('Curse');
    });
  }
}
