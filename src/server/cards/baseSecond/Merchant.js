import Card from 'cards/Card';

export default class Merchant extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.addPersistentEffect('play', this);
    player.addPersistentEffect('cleanup', this);
  }

  willTriggerOn(event, player, persistent) {
    return persistent && (
      event.name === 'cleanup' ||
      (event.name === 'play' && event.triggeringPlayer === player && event.card.title === 'Silver')
    ) ? { conflicts: false } : false;
  }

  async onTrigger(event, player) {
    if (event.name === 'play') {
      player.money++;
    }
    player.removePersistentEffect('cleanup', this);
    player.removePersistentEffect('play', this);
  }
}
