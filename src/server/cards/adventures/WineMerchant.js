import Card from 'cards/Card';

export default class WineMerchant extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action', 'Reserve');
  async onPlay(player) {
    player.money += 4;
    player.buys++;
    player.putOnTavernMat(this);
  }

  canTriggerOn(event, player) {
    return event.name === 'end-of-buy-phase' && event.triggeringPlayer === player && player.mats.tavern.includes(this) && player.money >= 2;
  }

  async onTrigger(event, player) {
    await player.discard(this, player.mats.tavern);
  }
}
