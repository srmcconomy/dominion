import Card from 'cards/Card';

export default class SwampHag extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action', 'Attack', 'Duration');
  async onPlay(player) {
    this.ignoreCleanup = true;
    player.addPersistentEffect('buy', this);
  }

  willTriggerOn(event, player, persistent) {
    return (
      (persistent === 'persistent' && event.name === 'buy' && event.triggeringPlayer !== player) ||
      (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this))
    );
  }

  async onTrigger(event, player, persistent) {
    if (persistent === 'persistent') {
      await event.triggeringPlayer.gain('Curse');
    } else {
      player.removePersistentEffect('buy', this);
      player.money += 3;
      this.ignoreCleanup = false;
    }
  }
}
