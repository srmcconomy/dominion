import Card from 'cards/Card';

export default class Curse extends Card {
  static VP = -1;
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Curse']);
  static supplyCategory = 'treasure2';
}
