import Card from 'cards/Card';

export default class TheForestsGift extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    player.buys++;
    player.money++;
    if (player.game.boonPile.includes(this)) {
      player.moveCard(this, player.game.boonPile, player.boonPile);
      player.addPersistentEffect('end-of-turn', this);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'end-of-turn' &&
    event.triggeringPlayer === player &&
    player.boonPile.includes(this);
  }

  async onTrigger(event, player) {
    player.moveCard(this, player.boonPile, player.game.boonDiscardPile);
    player.removePersistentEffect('end-of-turn', this);
  }
}
