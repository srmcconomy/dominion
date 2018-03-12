import Card from 'cards/Card';

export default class ZombieMason extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Zombie']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    const [card] = await player.lookAtTopOfDeck(1);
    if (card) {
      await player.trash(card, player.deck);
      const [supply] = await player.selectSupplies({
        min: 0,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          player.cardCostsLessThanEqualTo(s.cards.last(), { coin: card.cost.coin + 1 , debt: card.debt, potion: card.potion })
        ),
        message: 'Choose an card to gain'
      });
      if (supply) player.gain(supply.title);
    }
  }
}
