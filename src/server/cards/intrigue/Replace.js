import Card from 'cards/Card';

export default class Replace extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const [card] = await player.selectCards({ min: 1, max: 1, message: 'Select a card trash' });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          player.costsLessThanEqualTo(s.cards.last(), { coin: card.cost.coin + 2 })
        ),
        message: 'Choose an card to gain'
      });
      if (supply) {
        if (Card.classes.get(supply.title).types.has('Action') || Card.classes.get(supply.title).types.has('Treasure')) {
          await player.gain(supply.title, player.deck);
        } else await player.gain(supply.title);
        if (Card.classes.get(supply.title).types.has('Victory')) {
          await player.forEachOtherPlayer(async other => {
            if (event.handledByPlayer.get(other)) {
              return;
            }
            other.gain('Curse');
          });
        }
      }
    }
  }
}
