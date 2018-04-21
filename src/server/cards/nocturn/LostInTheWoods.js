import Card from 'cards/Card';

export default class LostInTheWoods extends Card {
  name = 'Lost in the Woods';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['State']);
  static supplyCategory = 'nonSupply';

  canTriggerOn(event, player) {
    return event.name === 'start-of-turn' &&
    event.triggeringPlayer === player &&
    player.game.lostInTheWoods.player === player;
  }

  async onTrigger(event, player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to discard'
    });
    if (card) {
      await player.discard(card);
      await player.takeBoon();
    }
  }
}
