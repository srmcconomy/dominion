import Card from 'cards/Card';

export default class CoinOfTheRealm extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Treasure', 'Reserve']);
  onPlay(player) {
    player.money++;
    player.moveCard(this, player.playArea, player.mats.tavern);
  }

  canTriggerOn(event, player) {
    return event.name === 'after-play' && event.triggeringPlayer === player && event.card.types.has('Action') && player.mats.tavern.includes(this);
  }

  async onTrigger(event, player) {
    player.moveCard(this, player.mats.tavern, player.playArea);
    player.actions += 2;
  }
}
