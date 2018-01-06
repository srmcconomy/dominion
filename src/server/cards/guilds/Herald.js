import Card from 'cards/Card';

export default class Herald extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = await player.lookAtTopOfDeck(1);
    player.game.log(`${player.name} reveals ${card.title}`);
    if (card.types.has('Action')) await player.play(card, player.deck);
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    const tempCost = await player.overpay();
    if (tempCost.coin > 0 || tempCost.potion > 0) {
      for (let i = 0; i < tempCost.coin; i++) {
        const [card] = await player.selectCards({
          min: 0,
          max: 1,
          pile: player.discardPile,
          message: 'Select a card to put on top of your deck'
        })
        if (card) {
          await player.topDeck(card, player.discardPile);
        } else {
          break;
        }
      }
    }
  }
}
