import Card from 'cards/Card';

export default class Ironworks extends Card {
  static cost = {coin:4};
  static types = new Set(['Action']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => s.cards.size > 0 && s.cards.last().costsLessThanEqualTo({coin: 4}),
      message: 'Gain a card costing up to 4',
    });
    if (!supply) {
      return;
    }
    const card = await player.gain(supply.title);
    if (card.types.has('Action')) {
      player.actions++;
    }
    if (card.types.has('Treasure')) {
      player.money++;
    }
    if (card.types.has('Victory')) {
      await player.draw(1);
    }
  }
}
