import Card from 'cards/Card';

export default class Replace extends Card {
  static cost = new Card.Cost({ coin: 5 });
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
          s.cards.last().cost.isLessThanEqualTo(card.cost.add({ coin: 2 }))
        ),
        message: 'Choose an card to gain'
      });
      if (supply) {
        const cardToGain = supply.cards.last();
        if (cardToGain.types.has('Action') || cardToGain.types.has('Treasure')) {
          await player.gainSpecificCard(cardToGain, cardToGain.supply, player.deck);
        } else {
          await player.gainSpecificCard(cardToGain, cardToGain.supply);
        }
        if (cardToGain.types.has('Victory')) {
          await player.forEachOtherPlayer(other => {
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
