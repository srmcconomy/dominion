import Card from 'cards/Card';

export default class Princess extends Card {
  static cost = { coin: 0 };
  static types = new Set(['Action', 'Prize']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.buys++;
  }

  willTriggerOn(event, player) {
    return event.name === 'card-cost' && event.triggeringPlayer === player && player.playArea.includes(this) ? { conflicts: false } : false;
  }

  onTrigger(event) {
    event.costModifiers.push(cost => {
      cost = cost.subtract({ coin: 2 });
      if (cost.coin < 0) {
        cost.coin = 0;
      }
      return cost;
    });
  }
}
