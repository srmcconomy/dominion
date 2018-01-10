import Card from 'cards/Card';

export default class Wharf extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    await player.draw(2);
    player.buys++;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(2);
    player.buys++;
    this.ignoreCleanUp = false;
  }
}
