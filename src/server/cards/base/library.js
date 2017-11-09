import Card from 'cards/Card';
import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import Pile from 'utils/Pile';

export default class Library extends Card {
  static cost = 5;
  static types = new Set(['Action']);

  async onPlay(player) {
    const aside = new Pile();
    while ((player.hand.size < 7) && (player.deck.size + player.discardPile.size > 0)) {
    	await player.draw(1, async card => {
    		if (card.types.has('Action')) {
    			const choice = await player.selectOption(['Put ' + card.title + ' in hand', 'Set ' + card.title + ' aside']);
    			return [player.hand, aside][choice];
    		}
    		return player.hand;
  		});
    }
    aside.asyncForEach(card => player.discard(card));
  }
}