import Card from 'cards/Card';

export default class TwiceMiserable extends Card {
  static VP = -4;
  name = 'Twice Miserable';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['State']);
  static supplyCategory = 'nonSupply';
}
