import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Moat extends Card {
  name = 'Moat';
  cost = 2;
  types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    player.draw(2);
  }
  onDraw(player) {
    player.on('before-attacked', this.onBeforeAttacked)
  }
  onDiscard(player) {
    player.removeEventListener('before-attacked', this.onBeforeAttacked);
  }
  onBeforeAttacked = attack => attack.nullify();
}
