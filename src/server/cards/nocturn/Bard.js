import Card from 'cards/Card';

export default class Bard extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    player.money += 2;
    await player.receiveBoon();
  }
}
