import Card from 'cards/Card';

export default class TheRiversGift extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player, from) {
    if (from.includes(this)) {
      player.moveCard(this, from, player.boonPile);
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
    await player.draw(player.boonsReceivedThisTurn.filter(b => b === this).length);
    player.removePersistentEffect('end-of-turn', this);
  }
}
