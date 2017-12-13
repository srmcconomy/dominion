import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Moat extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(2);
  }

  shouldReactTo(event) {
    return event === 'attack';
  }

  async reactTo() {
    return true;
  }
}
