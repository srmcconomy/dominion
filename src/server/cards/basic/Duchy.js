import Card from 'cards/Card';

export default class Duchy extends Card {
  static VP = 3;
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
}
