import Card from 'cards/Card';

export default class Coppersmith extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
}
