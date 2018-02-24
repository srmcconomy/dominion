import Card from 'cards/Card';

export default class Masterpiece extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Treasure']);
  async onPlay(player) {
    player.money++;
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    const tempCost = await player.overpay();
    if (tempCost.coin > 0 || tempCost.potion > 0) {
      for (let i = 0; i < tempCost.coin; i++) {
        await player.gain('Silver');
      }
    }
  }
}
