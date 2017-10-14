import Card from '../card';
import { Set } from 'immutable';

export default class Province extends Card {
  name = 'Province';
  VP = 6;
  cost = 8;
  types = new Set(['Victory']);
}
