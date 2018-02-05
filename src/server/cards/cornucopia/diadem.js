import Card from 'cards/Card';

export default class Diadem extends Card {
  static value = 2;
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Treasure', 'Prize']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money += 2 + player.actions;
  }
}
