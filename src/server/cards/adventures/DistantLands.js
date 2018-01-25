import Card from 'cards/Card';

export default class DistantLands extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Reserve', 'Victory']);
  async onPlay(player) {
    player.putOnTavernMat(this);
    this.isOnTavernMat = true;
  }

  getVpValue() {
    return this.isOnTavernMat ? 4 : 0;
  }
}
