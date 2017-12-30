import Card from 'cards/Card';

export default class MerchantShip extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    player.money += 2;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    player.money += 2;
    this.ignoreCleanUp = false;
  }
}
