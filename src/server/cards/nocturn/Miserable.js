import Card from 'cards/Card';

export default class Miserable extends Card {
  static VP = -2;
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['State']);
  static supplyCategory = 'nonSupply';
}
