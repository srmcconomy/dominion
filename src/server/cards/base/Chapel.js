import Card from 'cards/Card';

export default class Chapel extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.selectCards({ min: 0, max: 4, message: 'Choose up to 4 cards to trash' });
    await player.trashAll([...cards]);
  }
}
