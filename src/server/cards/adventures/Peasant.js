import Card from 'cards/Card';

export default class Peasant extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set('Action', 'Traveller');
  async onPlay(player) {
    player.buys++;
    player.money++;
  }

  canTriggerOn(event, player) {
    return event.name === 'discard' && event.triggeringPlayer === player && event.card === this && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    event.handledByPlayer.set(player, true);
    player.moveCard(this, player.playArea, player.game.supplies.get('Peasant'));
    player.moveCard(player.game.supplies.get('Soldier'), player.discardPile);
  }

  static getDependencies() {
    return ['Soldier', 'Fugitive', 'Disciple', 'Teacher'];
  }
}
