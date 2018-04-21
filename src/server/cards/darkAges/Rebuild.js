import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Rebuild extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      message: 'Name a card',
    });

    const aside = new Pile();
    while (player.deck.size + player.discardPile.size > 0) {
      const [card] = await player.draw(1, false);
      player.game.log(`${player.name} reveals ${card.name}`);
      if (card.types.has('Victory') && card.title !== supply.title) {
        await player.discardAll([...aside], aside);
        await player.trash(card);
        const [supply2] = await player.selectSupplies({
          min: 1,
          max: 1,
          predicate: s => (
            s.cards.size > 0 &&
            player.cardCostsLessThanEqualTo(s.cards.last(), { coin: card.cost.coin + 3 }) &&
            s.cards.last().types.has('Victory')
          ),
          message: 'Choose a Treasure card to gain'
        });
        if (supply2) {
          await player.gain(supply2.title);
        }
        break;
      } else {
        aside.push(card);
      }
    }
    if (aside.length) await player.discardAll([...aside], aside);
  }
}
