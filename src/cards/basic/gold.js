import Card from '../card';
import { Set } from 'immutable';

export default class Gold extends Card {
  name = 'Gold';
  value = 3;
  cost = 6;
  types = new Set(['Treasure']);
}
