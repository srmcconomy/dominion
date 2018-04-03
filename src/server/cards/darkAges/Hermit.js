import Card from 'cards/Card';

export default class Hermit extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      pile: [...player.hand, ...player.discardPile].filter(c => !c.types.has('Treasure')),
      message: 'Select a Card to trash'
    });
    if (card) {
      if (player.discardPile.includes(card)) {
        await player.trash(card, player.discardPile);
      }
      else {
        await player.trash(card);
      }
    }

    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (s.cards.length > 0 ? (
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 3 })
      ) : false),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'discard' &&
       event.triggeringPlayer === player &&
       (event.cards ? event.cards.includes(this) : false) &&
       player.playArea.includes(this) &&
       player.cardsBoughtThisTurn.length === 0;
  }

  async onTrigger(event, player) {
    await player.trash(this, player.playArea);
    await player.gain('Madman');
    event.handledForCard.add(this);
  }
}
