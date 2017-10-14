import Card from '../card';
import { Set } from 'immutable';

export default class CouncilRoom extends Card {
  static name = 'Council Room';
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.draw(4);
    player.buys++;
    await player.forEachOtherPlayer(other => other.draw(1));
  }
}

Card.classes['Council Room'] = CouncilRoom;
