import Card from '../card';
import { Set } from 'immutable';

export default class Festival extends Card {
  static name = 'Festival';
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    player.buys++;
    player.money += 2;
  }
}

Card.classes.Festival = Festival;
