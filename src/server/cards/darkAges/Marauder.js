import Card from 'cards/Card';

export default class Marauder extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack', 'Looter']);
  async onPlay(player, event) {
    await player.gain('Spoils');
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.gain('Ruins');
    });
  }
}
