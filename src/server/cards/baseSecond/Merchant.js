import Card from 'cards/Card';

export default class Merchant extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.addPersistentEffect('play', this);
    player.addSilentEffect('cleanup', this);
  }

  willTriggerOn(event, player, persistent) {
    return persistent === 'persistent' && event.triggeringPlayer === player && event.card.title === 'Silver';
  }

  async onTrigger(event, player) {
    if (event.name === 'play') {
      player.money++;
    }
    player.removeSilentEffect('cleanup', this);
    player.removePersistentEffect('play', this);
  }
}
