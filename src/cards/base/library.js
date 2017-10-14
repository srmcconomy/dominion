import Card from '../card';
import { Set } from 'immutable';

export default class Library extends Card {
  static name = 'Library';
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.draw(7 - player.hand.size);
  }
}

Card.classes.Library = Library;
