import Card from 'cards/Card';

export default class Platinum extends Card {
  static value = 5;
  static cost = 9;
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply(game) {
    return 12;
  }
  onPlay(player) {
    player.money += 5;
  }
}
