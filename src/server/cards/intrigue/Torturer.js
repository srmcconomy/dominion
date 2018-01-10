import Card from 'cards/Card';

export default class Torturer extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.draw(3);
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      const choice = await other.selectOption(['Discard two cards', 'Gain a Curse to Hand']);
      switch (choice) {
        case 0:
          {
            const cards = await other.selectCards({ min: 2, max: 2, message: 'Select two cards to discared' });
            for (let i = 0; i < cards.length; i++) {
              await other.discard(cards[i]);
            }
          }
          break;
        case 1:
          await other.gain('Curse', other.hand);
          break;
        default:
          break;
      }
    });
  }
}
