import Card from 'cards/Card';

export default class SwampHag extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Duration']);
  async onPlay(player, event) {
    this.ignoreCleanup = true;
    player.addPersistentEffect('buy', this);
    this.handledByPlayer = event.handledByPlayer;
  }

  willTriggerOn(event, player, persistent) {
    return (
      (persistent === 'persistent' && event.name === 'buy' && event.triggeringPlayer !== player && !this.handledByPlayer.has(event.triggeringPlayer)) ||
      (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this))
    );
  }

  async onTrigger(event, player, persistent) {
    if (persistent === 'persistent') {
      await event.triggeringPlayer.gain('Curse');
    } else {
      player.removePersistentEffect('buy', this);
      this.handledByPlayer = null;
      player.money += 3;
      this.ignoreCleanup = false;
    }
  }
}
