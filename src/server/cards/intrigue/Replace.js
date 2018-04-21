import Card from 'cards/Card';

export default class Replace extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card trash'
    });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: async s => (s.cards.length > 0 ? (
          player.cardCostsLessThanEqualTo(s.cards.last(), (await player.getCardCost(card)).add({ coin: 2 }))
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        const cardToGain = supply.cards.last();
        if (cardToGain.types.has('Action') || cardToGain.types.has('Treasure')) {
          await player.gain(cardToGain.title, player.deck);
        } else {
          await player.gain(cardToGain.title);
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
