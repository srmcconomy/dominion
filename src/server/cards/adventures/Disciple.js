import Card from 'cards/Card';

export default class Disciple extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action', 'Traveller');
  async onPlay(player) {
    // RIP
  }

  canTriggerOn(event, player) {
    return event.name === 'discard' && event.triggeringPlayer === player && event.card === this && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    event.handledByPlayer.set(player, true);
    player.moveCard(this, player.playArea, player.game.supplies.get('Disciple'));
    player.moveCard(player.game.supplies.get('Teacher'), player.discardPile);
  }
}
