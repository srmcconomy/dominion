import Card from 'cards/Card';

export default class Province extends Card {
  static VP = 6;
  static cost = new Card.Cost({ coin: 8 });
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
}
