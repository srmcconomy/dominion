import Card from 'cards/Card';

export default class SeaHag extends Card {
  static cost = {coin:4};
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.forEachOtherPlayer(async other => {
    	if (await other.handleOwnReactions('attack', other, this)) {
        return;
      }
      const [card] = other.lookAtTopOfDeck(1);
      if (card) {
    	  await other.discard(card, other.deck);
      }
    	await other.gain('Curse', other.deck);
    });
  }
}
