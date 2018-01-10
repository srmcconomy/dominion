import Card from 'cards/Card';

export default class Smithy extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
  }
}
