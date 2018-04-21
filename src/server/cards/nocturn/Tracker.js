import Card from 'cards/Card';

export default class Tracker extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    player.money++;
    await player.takeBoon();
  }

  canTriggerOn(event, player) {
    return event.name === 'would-gain' &&
    event.triggeringPlayer === player &&
    player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    event.destination = player.deck;
  }
}
