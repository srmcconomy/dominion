import Card from 'cards/Card';

export default class Hermit extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      pile: [...player.hand, ...player.discardPile],
      predicate: c => !c.types.has('Treasure'),
      message: 'Select a Card to trash'
    });
    if (card) await player.trash(card);

    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.costsLessThanEqualTo(s.cards.last(), { coin: 3 })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'discard' &&
       event.triggeringPlayer === player &&
       event.card === this &&
       player.playArea.includes(this) &&
       player.cardsBoughtThisTurn.length === 0;
  }

  async onTrigger(event, player) {
    await player.trash(this);
    await player.gain('Madman');
  }

  static getDependencies() {
    return ['Madman'];
  }
}
