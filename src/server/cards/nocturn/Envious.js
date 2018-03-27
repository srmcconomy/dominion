import Card from 'cards/Card';

export default class Envious extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['State']);
  static supplyCategory = 'nonSupply';

  willTriggerOn(event, player, persistent) {
    switch (event.name) {
      case 'start-of-buy-phase':
        return event.triggeringPlayer === player &&
      player.states.includes(this);
      case 'play':
        return persistent &&
        event.triggeringPlayer === player &&
        (event.card.title === 'Silver' || event.card.title === 'Gold');
      case 'cleanup':
        return persistent &&
        event.triggeringPlayer === player;
      default:
        return false;
    }

  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'start-of-buy-phase':
        player.addPersistentEffect('play', this);
        player.addPersistentEffect('cleanup', this);
        break;
      case 'play':
        if (event.card.title === 'Silver') player.money--;
        if (event.card.title === 'Gold') player.money -= 2;
        break;
      case 'cleanup':
        player.removePersistentEffect('cleanup', this);
        player.removePersistentEffect('play', this);
        player.states.delete(this);
        break;
      default:
        break;
    }
  }
}
