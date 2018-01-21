import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Saboteur extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }

      const aside = new Pile();
      let done = false;
      while ((done === false) && (other.deck.size + other.discardPile.size > 0)) {
        const [card] = await other.draw(1, false);
        if (player.costsMoreThanEqualTo(card, { coin: 3 })) {
          await other.trash(card, other.deck);
          const [supply] = await other.selectSupplies({
            min: 1,
            max: 1,
            predicate: async s => (
              s.cards.size > 0 &&
              player.cardCostsLessThanEqualTo(s.cards.last(), (await player.getCardCost(card)).add({ coin: -2 }))
            ),
            message: 'Select a card to gain'
          });
          if (supply) await other.gain(supply.title);
          done = true;
        } else {
          aside.push(card);
        }
      }
      while (aside.length > 0) {
        await other.discard(aside.last(), aside);
      }
    });
  }
}
