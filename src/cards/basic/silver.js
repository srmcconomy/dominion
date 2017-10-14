import Card from '../card';
import { Set } from 'immutable';

export default class Silver extends Card {
  name = 'Silver';
  value = 2;
  cost = 3;
  types = new Set(['Treasure']);
}
