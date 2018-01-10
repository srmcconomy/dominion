import Card from 'cards/Card';

export default class Hireling extends Card {
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set('Action', 'Duration');
  async onPlay() {
    this.ignoreCleanup = true;
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(1);
  }
}
