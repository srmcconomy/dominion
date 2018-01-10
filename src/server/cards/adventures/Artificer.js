import Card from 'cards/Card';

export default class Artificer extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action');
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
    const cards = await player.selectCards({
      min: 0,
      max: player.hand.length,
      message: 'Choose any number of cards to discard',
    });
    const [supply] = await player.selectSupplies({
      min: 0,
      max: 1,
      predicate: s => s.cards.length > 0 && s.cards.last().cost.isLessThanEqualTo({ coin: cards.length }),
      message: `Gain a card costing up to ${cards.length} coins`,
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }
}
