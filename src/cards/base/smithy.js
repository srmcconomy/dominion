import Card from '../card';
import { Set } from 'immutable';

export default class Smithy extends Card {
  name = 'Smithy';
  cost = 4;
  types = new Set(['Action']);
  async onPlay(player) {
    player.draw(3);
  }
}
