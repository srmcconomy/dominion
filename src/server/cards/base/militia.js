import Card from 'cards/Card';

export default class Militia extends Card {
  static cost = 4;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (other.hand.size > 3) {
        const cards = await other.selectCards({ min:  other.hand.size - 3, max:  other.hand.size - 3, message: 'Discard down to three cards in hand' });
        cards.forEach(async card => await other.discard(card));
      }
    });
  }
}
