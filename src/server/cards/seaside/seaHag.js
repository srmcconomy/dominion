import Card from 'cards/Card';

export default class SeaHag extends Card {
  static cost = 4;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.forEachOtherPlayer(async other => {
    	if (await other.handleOwnReactions('attack', other, this)) {
        return;
      	}
    	await other.discard(other.deck.list[other.deck.size - 1],other.deck);
    	await other.gain('Curse', other.deck);
    });
  }
}
