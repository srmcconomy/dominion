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
    let coin = 0;
    let silversPlayed = 0;

    player.playArea.forEach(c => {
      if (c.title === 'Merchant') {
        coin++;
      } else if (c.title == 'Silver')
      {
        silversPlayed++;
      }
    })
    player.money += (silversPlayed > 1) ? 2 : 2 + coin;
  }
}
