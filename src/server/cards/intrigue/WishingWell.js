import Card from 'cards/Card';

export default class WishingWell extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: () => true,
      message: 'Name a card',
    });
    const [card] = await player.lookAtTopOfDeck(1);
    if (card && card.title === supply.title) {
      await player.draw(1);
    }
  }
}
