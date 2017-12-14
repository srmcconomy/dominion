import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Lighthouse extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    await player.actions++;
    player.money++;
  }

  async onTurnStart(player) {
    player.money++;
    this.ignoreCleanUp = false;
  }

  shouldReactTo(event, attacker, player) {
    return (event === 'attack') && (player.playArea.hasID(this.id));
  }

  async reactTo() {
    return true;
  }
}
