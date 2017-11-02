import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Colony extends Card {
  name = 'Colony';
  VP = 10;
  cost = 11;
  types = new Set(['Victory']);
}
