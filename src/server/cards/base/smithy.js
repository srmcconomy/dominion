import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Smithy extends Card {
  name = 'Smithy';
  cost = 4;
  types = new Set(['Action']);
  async onPlay(player) {
    player.draw(3);
  }
}
