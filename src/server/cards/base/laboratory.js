import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Laboratory extends Card {
  name = 'Laboratory';
  cost = 5;
  types = new Set(['Action']);
  async onPlay(game) {
    game.currentPlayer.draw(2);
    game.currentPlayer.actions += 1;
  }
}
