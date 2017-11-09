import Card from 'cards/Card';

export default class Colony extends Card {
  static VP = 10;
  static cost = 11;
  static types = new Set(['Victory']);
}
