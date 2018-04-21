import Card from 'cards/Card';

export default class Soothsayer extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.gain('Gold');
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      if (await other.gain('Curse')) await other.draw(1);
    });

  }
}
