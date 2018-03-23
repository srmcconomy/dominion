import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Doctor extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: () => true,
      message: 'Name a card',
    });
    const cards = await player.draw(3, false);
    let card;
    while (card = cards.find(c => c.title === supply.title)) {
      await player.trash(card, cards);
    }
    while (cards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cards,
        message: 'Select a card to put on your deck'
      });
      player.topDeck(card, cards);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    const tempCost = await player.overpay();
    if (tempCost.coin > 0 || tempCost.potion > 0) {
      for (let i = 0; i < tempCost.coin; i++) {
        const [card] = await player.lookAtTopOfDeck(1);
        const choice = await player.selectOption([`Trash ${card.name}`, `Discard ${card.name}`, `Top deck ${card.name}`], 'Choose what to do with card');
        switch (choice) {
          case 0:
            await player.trash(card, player.deck);
            break;
          case 1:
            await player.discard(card, player.deck);
            break;
          case 2:
          default:
            break;
        }
      }
    }
  }
}
