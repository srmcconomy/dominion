import Card from 'cards/Card';

export default class Poacher extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
    let emptySupplies = 0;
    player.game.supplies.forEach(s => {
      if (s.cards.size === 0) {
        emptySupplies++;
      }
    });
    if (emptySupplies) {
      const cards = await player.selectCards({
        min: emptySupplies,
        max: emptySupplies,
        message: 'Choose cards to discard'
      });
      for (let i = 0; i < cards.length; i++) {
        await player.discard(cards[i]);
      }
    }
  }
}
