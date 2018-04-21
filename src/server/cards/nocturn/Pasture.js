import Card from 'cards/Card';

export default class Pasture extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Treasure', 'Victory', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
  }
  getVpValue(player) {
    return player.cardsOwned.filter(c => c.title === 'Estate').length;
  }
}
