import Card from 'cards/Card';

export default class Graverobber extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const choice = await player.selectOption(['Gain card fom trash', 'Trash card in hand']);

    switch (choice) {
      case 0:
        if (player.game.trash.size > 0) {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            pile: player.game.trash.filter(c => (c.types.has('Action') && player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 }))),
            message: 'Choose an action to gain' });
          if (card) {
            await player.gainSpecificCard(card, player.game.trash, player.deck);
          }
        }
        break;
      case 1:
        {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            predicate: c => c.types.has('Action'),
            message: 'Choose a Card to Trash'
          });
          if (card) {
            await player.trash(card);
            const [supply] = await player.selectSupplies({
              min: 1,
              max: 1,
              predicate: s => (
                s.cards.size > 0 &&
            player.costsLessThanEqualTo(s.cards.last(), { coin: card.cost.coin + 3 })
              ),
              message: 'Choose an card to gain'
            });
            if (supply) {
              await player.gain(supply.title);
            }
          }
        }
        break;
      default:
        break;
    }
  }
}
