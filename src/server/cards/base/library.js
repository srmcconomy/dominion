import Card from 'cards/Card';

export default class Library extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    while ((player.hand.size < 7) && (player.deck.size + player.discardPile.size > 0)) {
    	await player.draw(1, async card => {
    		if (card.types.has('Action')) {
          // Display what card
    			const choice = await player.selectOption(['Put in hand', 'Set aside']);
    			return [player.hand, player.aside][choice];
    		}
    		return player.hand;
  		});
    }
    await player.aside.forEach(async card => await player.discard(card));
  }
}