import Card from 'cards/Card';

export default class Herbalist extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    player.money++;
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      player.playArea.includes(this) &&
      player.playArea.some(c => c.types.has('Treasure'))
    );
  }

  async onTrigger(event, player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      pile: player.playArea,
      predicate: c => c.types.has('Treasure'),
      message: 'Select a treasure to put on top of your deck'
    });
    if (card) player.topDeck(card, player.playArea);
  }
}
