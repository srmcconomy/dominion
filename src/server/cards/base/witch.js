import Card from 'cards/Card';

export default class Witch extends Card {
  static cost = {coin:5};
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.draw(2);
    await player.forEachOtherPlayer(async other => {
    	if (await other.handleOwnReactions('attack', other, this)) {
        return;
      }
      other.gain('Curse')});
  }
}
