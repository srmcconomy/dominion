import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Sentry extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
  	const aside = new Pile();
  	await player.draw(1);
  	player.actions++;

	const cards = await player.draw(2, aside);

	for (let i = 0; i < cards.size; i++) {
		if (cards.list[i]) {
			const choice = await player.selectOption(['Trash ' + cards.list[i].title, 'Discard ' + cards.list[i].title]);
			switch (choice) {
				case 0:
					 await player.trash(cards.list[i], aside);
				break;
				case 1:
					 await player.discard(cards.list[i], aside);
				break;
				default:
				break;
			}
		}
	}
	aside.asyncForEach(card => player.discard(card)); // Sanity
  }
}
