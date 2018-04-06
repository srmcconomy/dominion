import Card from 'cards/Card';

export default class WalledVillage extends Card {
  name = 'Walled Village';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'cleanup' &&
      event.triggeringPlayer === player &&
      player.playArea.includes(this) &&
      (player.playArea.filter(c => c.types.has('Action')).length <= 2)
    );
  }

  async onTrigger(event, player) {
    player.topDeck(this, player.playArea);
  }
}
