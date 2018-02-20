import Card from 'cards/Card';

export default class Procession extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const card = await player.playMultiple(this, 2);
    if (card) {
      if (player.playArea.includes(card)) await player.trash(card, player.playArea);
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
