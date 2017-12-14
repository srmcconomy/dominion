import Card from 'cards/Card';

export default class Outpost extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    this.ignoreCleanUp = true;
    player.playArea.filter(c => c !== this).forEach(c => {
      if (c.title === 'Outpost') this.ignoreCleanUp = false;
    });
    if (player.game.previousPlayer === player) this.ignoreCleanUp = false;
  }
  async onTurnStart(player) {
	    this.ignoreCleanUp = false;
  }
}
