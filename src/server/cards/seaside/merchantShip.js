import Card from 'cards/Card';

export default class MerchantShip extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    player.money += 2;
  }
  async onTurnStart(player) {
  	player.money += 2;
    this.ignoreCleanUp = false;
  }
}
