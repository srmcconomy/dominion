import Card from '../card';
import { Set } from 'immutable';

export default class Witch extends Card {
  name = 'Witch';
  cost = 5;
  types = new Set(['Action', 'Attack']);
  async onPlay(game) {
    game.currentPlayer.draw(2);
    game.forEachOtherPlayer(player => player.gain('Curse'));
  }
}
