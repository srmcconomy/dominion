import Card from 'cards/Card';

export default class Artificer extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
    const cards = await player.selectCards({
      min: 0,
      max: player.hand.length,
      message: 'Choose any number of cards to discard',
    });
    await player.discardAll(cards, player.hand);
    const [supply] = await player.selectSupplies({
      min: 0,
      max: 1,
      predicate: s => s.cards.length > 0 && player.cardCostsEqualTo(s.cards.last(), { coin: cards.length }),
      message: `You may gain a card costing up to ${cards.length} coins`,
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }
}
