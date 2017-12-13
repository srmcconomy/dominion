import Card from 'cards/Card';

export default class Militia extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', player, this)) {
        return;
      }
      if (other.hand.size > 3) {
        const cards = await other.selectCards({ min: other.hand.size - 3, max: other.hand.size - 3, message: 'Discard down to three cards in hand' });
        for (let i = 0; i < cards.length; i++) {
          await other.discard(cards[i]);
        }
      }
    });
  }
}
