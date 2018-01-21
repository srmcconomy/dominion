import Card from 'cards/Card';

export default class Bridge extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    player.money++;
    player.addPersistentEffect('card-cost', this);
    player.addPersistentEffect('cleanup', this);
  }

  willTriggerOn(event, player, persistent) {
    return persistent ? { conflicts: false } : false;
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'card-cost':
        event.costModifiers.push(cost => (cost.coin > 0 ? cost.subtract({ coin: 1 }) : cost));
        break;
      case 'cleanup':
        player.removePersistentEffect('card-cost', this);
        player.removePersistentEffect('cleanup', this);
        break;
    }
  }
}
