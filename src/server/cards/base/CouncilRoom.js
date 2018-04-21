import Card from 'cards/Card';

export default class CouncilRoom extends Card {
  name = 'Council Room';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(4);
    player.buys++;
    await player.forEachOtherPlayer(other => other.draw(1));
  }
}
