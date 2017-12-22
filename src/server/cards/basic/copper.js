import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Copper extends Card {
  static value = 1;
  static cost = { coin: 0 };
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply(game) {
    return 60 - (7 * game.players.size);
  }
  onPlay(player) {
    player.money++;
  }
}
