import Card from 'cards/Card';

export default class Taxman extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const [card] = await player.selectCards({
      min:0,
      max:1,
      predicate: c=> c.types.has('Treasure'),
      message: 'Select a treasure to trash'
    });

    if (card) {
      await player.trash(card);
      await player.forEachOtherPlayer(async other => {
        if (event.handledByPlayer.get(other)) {
          return;
        }
        const [cardOther] = await other.selectCards({
          min:1,
          max:1,
          predicate: c => c.name === card.name,
          message: `Discard a ${card.name}`
        });
        if (cardOther) {
          await other.discard(cardOther);
        } else {
          player.game.log(`${other.name} reveals ${other.hand.map(c => c.title).join(', ')}`);
        }
      });
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          player.costsLessThanEqualTo(s.cards.last(), { coin: card.cost.coin + 3 }) &&
          s.cards.last().types.has('Treasure')
        ),
        message: 'Choose a Treasure card to gain'
      });
      if (supply) {
        await player.gain(supply.title, player.deck);
      }
    }
  }
}
