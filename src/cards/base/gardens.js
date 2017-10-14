import Card from '../card';
import { Set } from 'immutable';

export default class Gardens extends Card {
  static name = 'Gardens';
  static cost = 4;
  static types = new Set(['Victory']);
  get vp() {
    return this.calculateVP();
  }
  calculateVP() {
    return 0;
  }
  async onGain(player) {
    this.calculateVP = () => player.cards.size / 10 | 0;
  }
}
