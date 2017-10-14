import Card from '../card';
import { Set } from 'immutable';

export default class Duchy extends Card {
  name = 'Duchy';
  VP = 3;
  cost = 5;
  types = new Set(['Victory']);
}
