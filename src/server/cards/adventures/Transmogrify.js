import Card from 'cards/Card';

export default class Transmogrify extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Reserve']);
  async onPlay(player) {
    player.actions++;
    player.moveCard(this, player.playArea, player.mats.tavern);
  }

  canTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.mats.tavern.includes(this);
  }

  async onTrigger(event, player) {
    player.moveCard(this, player.mats.tavern, player.playArea);
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to trash',
    });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: async s => s.cards.length > 0 && player.cardCostsEqualTo(s.cards.last(), (await player.getCardCost(card)).add({ coin: 1 })),
      });
      if (supply) {
        await player.gain(supply.title, player.hand);
      }
    }
  }
}
