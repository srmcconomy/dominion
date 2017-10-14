import Card from '../card';
import { Set } from 'immutable';

export default class Market extends Card {
  name = 'Market';
  cost = 5;
  types = new Set(['Action']);
  async onPlay(player) {
    player.draw(1);
    player.actions++;
    player.buys++;
    player.money++;
  }
}
