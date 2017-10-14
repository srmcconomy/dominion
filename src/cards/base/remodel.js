import Card from '../card';
import { Set } from 'immutable';

export default class Remodel extends Card {
  name = 'Remodel';
  cost = 4;
  types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.selectCards(1, 1);
    if (cards.size > 0) {
      player.trash(cards.get(0));
      const supply = await player.chooseSupplyWhere(supply => supply.last().cost <= cards.get(0).cost + 2);
      player.gain(supply.last().name);
    }
  }
}
