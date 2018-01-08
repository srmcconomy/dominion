import Card from 'cards/Card';

export default class Mercenary extends Card {
  static cost = { coin: 0 };
  static types = new Set(['Action', 'Attack']);
  static supplyCategory = 'nonSupply';
  
  async onPlay(player, event) {
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      message: 'Choose 2 cards to trash'
    });
    for (let i = 0; i < cards.length; i++) {
      await player.trash(cards[i]);
    }
    if (cards.length === 2) {
      await player.draw(2);
      player.money += 2;
      await player.forEachOtherPlayer(async other => {
        if (event.handledByPlayer.get(other)) {
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
}
