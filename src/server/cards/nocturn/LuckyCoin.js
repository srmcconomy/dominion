import Card from 'cards/Card';

export default class LuckyCoin extends Card {
  name = 'Lucky Coin';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Treasure', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
    await player.gain('Silver');
  }
}
