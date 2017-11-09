import Card from 'cards/Card';

export default class Chapel extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.selectCards({ min: 0, max: 4, message: 'Choose up to 4 cards to trash' });
    for (let i = 0; i < cards.length; i++) {
	  await player.trash(cards[i]);
	}
  }
}
