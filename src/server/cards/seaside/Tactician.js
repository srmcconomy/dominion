import Card from 'cards/Card';

export default class Tactician extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    if (player.hand.size) {
      while (player.hand.size) {
        await player.discard(player.hand.last());
      }
      this.ignoreCleanUp = true;
    } else {
      this.ignoreCleanUp = false;
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(5);
    player.actions++;
    player.buys++;
    this.ignoreCleanUp = false;
  }
}
