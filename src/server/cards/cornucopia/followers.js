import Card from 'cards/Card';

export default class Followers extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Attack', 'Prize']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    await player.draw(2);
    await player.gain('Estate');
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.gain('Curse');
      if (other.hand.size > 3) {
        const cards = await other.selectCards({
          min: other.hand.size - 3,
          max: other.hand.size - 3,
          message: 'Discard down to three cards in hand'
        });
        for (let i = 0; i < cards.length; i++) {
          await other.discard(cards[i]);
        }
      }
    });
  }
}
