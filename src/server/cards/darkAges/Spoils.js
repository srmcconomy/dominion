import Card from 'cards/Card';

export default class Spoils extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Treasure']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money += 3;
    if (player.playArea.includes(this)) await player.returnToSupply(this, player.playArea);
  }
}
