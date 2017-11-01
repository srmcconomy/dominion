import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Laboratory extends Card {
  name = 'Laboratory';
  cost = 5;
  types = new Set(['Action']);
  async onPlay(game) {
    const supply = await game.currentPlayer.chooseSupplyWhere(supply => supply.size > 0 && supply.last().cost <= 4)
    game.currentPlayer.gain(supply.last().name);
  }
}
