import Card from 'cards/Card';

export default class Caravan extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(1);
    this.ignoreCleanUp = false;
  }
}
