import Card from 'cards/Card';

export default class MerchantGuild extends Card {
  static cost = { coin: 0 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    player.money++;
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    player.coinTokens++;
  }
}
