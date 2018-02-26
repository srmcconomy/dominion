import Card from 'cards/Card';

export default class Mercenary extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Attack']);
  static supplyCategory = 'nonSupply';

  async onPlay(player, event) {
    const choice = await player.selectOption(['Trash 2 cards', 'Don\'t']);
    if (choice === 0) {
      const cards = await player.selectCards({
        min: 2,
        max: 2,
        message: 'Choose 2 cards to trash'
      });

      await player.trashAll([...cards]);
      if (cards.length === 2) {
        await player.draw(2);
        player.money += 2;
        await player.forEachOtherPlayer(async other => {
          if (event.handledByPlayer.get(other)) {
            return;
          }
          if (other.hand.size > 3) {
            const cards2 = await other.selectCards({
              min: other.hand.size - 3,
              max: other.hand.size - 3,
              message: 'Discard down to three cards in hand'
            });

            await other.discardAll([...cards2], other.hand);
          }
        });
      }
    }
  }
}
