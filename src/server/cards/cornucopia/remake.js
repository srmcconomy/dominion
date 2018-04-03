import Card from 'cards/Card';

export default class Remake extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    for (let i = 0; i < 2; i++) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        message: 'Select a card to trash'
      });
      if (card) {
        await player.trash(card);
        const [supply] = await player.selectSupplies({
          min: 1,
          max: 1,
          predicate: s => {
            const tempCost = { coin: 0, debt: 0, potion: 0, ...card.cost };
            tempCost.coin++;
            return (s.cards.length > 0 ? (
              player.cardCostsEqualTo(s.cards.last(), tempCost)
            ) : false);
          },
          message: 'Choose an card to gain'
        });
        if (supply) {
          await player.gain(supply.title);
        }
      }
    }
  }
}
