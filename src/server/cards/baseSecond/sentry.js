import Card from 'cards/Card';

export default class Sentry extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
  	await player.draw(1);
  	player.actions++;

	await player.draw(2, async card => {
		const choice = await player.selectOption(['Trash ' + card.title, 'Discard ' + card.title]);
		return [player.game.trash, player.discardPile][choice];
	});
  }
}
