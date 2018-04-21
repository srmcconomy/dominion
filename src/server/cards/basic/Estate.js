import Card from 'cards/Card';

export default class Estate extends Card {
  static VP = 1;
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
}
