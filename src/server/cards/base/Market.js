import Card from 'cards/Card';

export default class Market extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.buys++;
    player.money++;
  }
}
