import Card from 'cards/Card';

export default class Leprechaun extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Doom']);
  async onPlay(player) {
    await player.gain('Gold');
    if (player.playArea.length === 7) {
      await player.gain('Wish');
    } else {
      await player.takeHex();
    }
  }
}
