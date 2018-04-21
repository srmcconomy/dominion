import Card from 'cards/Card';

export default class Locusts extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const [card] = await player.lookAtTopOfDeck(1);
    if (card) {
      await player.trash(card, player.deck);
      if (card.title === 'Copper' || card.title === 'Estate') {
        await player.gain('Curse');
      } else {
        const [supply] = await player.selectSupplies({
          min: 1,
          max: 1,
          predicate: s => {
            if (s.cards.length > 0) {
              let sharesType = false;
              s.cards.last().types.forEach(t => {
                if (card.types.has(t)) {
                  sharesType = true;
                }
              });
              return sharesType && player.cardCostsLessThan(s.cards.last(), card);
            }
            return false;
          },
          message: 'Select a card to gain'
        });
        await player.gain(supply.title);
      }
    }
  }
}
