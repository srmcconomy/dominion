import Card from 'cards/Card';

export default class Prizes extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Prize']);
  static supplyCategory = 'nonSupply';
}
