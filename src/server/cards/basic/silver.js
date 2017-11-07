import Card from 'cards/Card';

export default class Silver extends Card {
  static value = 2;
  static cost = 3;
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply(game) {
    return 40;
  }
  onPlay(player) {
    player.money += 2;
  }
}
