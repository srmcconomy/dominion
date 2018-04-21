import Card from 'cards/Card';

export default class Familiar extends Card {
  static cost = new Card.Cost({ coin: 3, potion: 1 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.draw(1);
    player.actions++;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.gain('Curse');
    });
  }
}
