import Card from 'cards/Card';

export default class YoungWitch extends Card {
  static cost = {coin:4};
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.draw(2);
    const cards = await player.selectCards({min:2, max:2, message: 'Discard two cards'});
    for (let i = 0; i < cards.length; i++) {
    	await player.discard(cards[i]);
    }
    await player.forEachOtherPlayer(async other => {
    	if (await other.handleOwnReactions('attack', player, this)) {
        	return;
      	}
      	const [card] = await other.selectCards({min:0, max:1, predicate: c => c.bane === true, message: 'Choose to reveal a bane card or not'});
      	if (typeof card === 'undefined') {
      		await other.gain('Curse');
      	}
  	});
  }
}
