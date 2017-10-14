import Card from '../card';
import { Set } from 'immutable';

export default class Village extends Card {
  name = 'Village';
  cost = 3;
  types = new Set(['Action']);
  async onPlay(game) {
    game.currentPlayer.draw(1);
    game.currentPlayer.actions += 2;
  }
}
