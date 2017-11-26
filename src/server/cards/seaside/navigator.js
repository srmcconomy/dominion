import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Navigator extends Card {
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
  	const aside = new Pile();
    player.money += 2;
    const cards = await player.lookAtTopOfDeck(5);
    const choice = await player.selectOption(['Keep on top', 'Discard all five']);
    switch (choice) {
    	case 0:
    	while (aside.size) {
    		let [card] = await player.selectCards({min:1, max:1, pile:aside, message:'Select card to place on deck'});
    		await player.topDeck(card,aside);
    	}
    	break;
    	case 1:
    	for(let i = 0; i < cards.size; i++) {
    		await player.discard(cards.list[i],aside)
    	}
    	break;
    	default:
    	break;

    }
    aside.asyncForEach(card => player.discard(card)); // Sanity
  }
}
