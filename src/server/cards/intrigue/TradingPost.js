import Card from 'cards/Card';

export default class TradingPost extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.selectCards({ min: 2, max: 2, message: 'Select two cards to trash' });
    if (cards) {
      for (let i = 0; i < cards.length; i++) {
        await player.trash(cards[i]);
      }
      if (cards.length === 2) await player.gain('Silver', player.hand);
    }
  }
}
