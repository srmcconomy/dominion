import Card from 'cards/Card';

export default class Ruins extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'treasure';
}
