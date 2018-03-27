import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class War extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const aside = new Pile();
    let done = false;
    while ((done === false) && (player.deck.size + player.discardPile.size > 0)) {
      const [card] = await player.draw(1, false);
      aside.push(card);
      if (await player.cardCostsGreaterThanEqualTo(card, { coin: 3 })
      && await player.cardCostsLessThanEqualTo(card, { coin: 4 })) {
        await player.trash(card, aside);
        done = true;
      }
    }
    await player.discardAll([...aside], aside);
  }
}
