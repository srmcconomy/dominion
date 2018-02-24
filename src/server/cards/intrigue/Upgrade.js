import Card from 'cards/Card';

export default class Upgrade extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = await player.selectCards({ min: 1, max: 1, message: 'Select a card to trash' });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          player.cardCostsEqualTo(s.cards.last(), { coin: card.cost.coin + 1 })
        ),
        message: 'Choose an card to gain'
      });
      if (supply) player.gain(supply.title);
    }
  }
}
