import Card from 'cards/Card';

export default class Wharf extends Card {
  static cost = {coin:5};
  static types = new Set(['Action','Duration']);
  async onPlay(player) {
    await player.draw(2);
    player.buys++;
  }
  async onTurnStart(player) {
  	await player.draw(2);
    player.buys++;
    this.ignoreCleanUp = false;
  }
}
