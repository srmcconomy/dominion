import Card from 'cards/Card';

export default class Stonemason extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to trash'
    });
    if (card) {
      await player.trash(card);
      for (let i = 0; i < 2; i++) {
        const [supply] = await player.selectSupplies({
          min: 1,
          max: 1,
          predicate: s => (
            s.cards.size > 0 &&
            player.costsLessThan(s.cards.last(), card.cost)
          ),
          message: 'Choose an card to gain'
        });
        if (supply) {
          await player.gain(supply.title);
        }
      }
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    const tempCost = await player.overpay();
    if (tempCost.coin > 0 || tempCost.potion > 0) {
      for (let i = 0; i < 2; i++) {
        const [supply] = await player.selectSupplies({
          min: 1,
          max: 1,
          predicate: s => (
            s.cards.size > 0 &&
        player.costsEqualTo(s.cards.last(), tempCost)
          ),
          message: 'Choose an card to gain'
        });
        if (supply) {
          await player.gain(supply.title);
        }
      }
    }
  }
}
