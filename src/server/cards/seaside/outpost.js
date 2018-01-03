import Card from 'cards/Card';

export default class Outpost extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    if (
      !player.cardsPlayedThisTurn.some(card => card !== this && card.title === 'Outpost') &&
      !player.playArea.some(card => card !== this && card.title === 'Outpost')
    ) {
      this.ignoreCleanUp = true;
    }
  }

  willTriggerOn(event, player) {
    return (
      (event.name === 'cleanup' && this.ignoreCleanUp) ||
      event.name === 'start-of-turn'
    ) && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'cleanup':
        event.handledByPlayer.set(player, true);
        await player.cleanup();
        await player.draw(3);
        await player.takeTurn();
        break;
      case 'start-of-turn':
        this.ignoreCleanUp = false;
        break;
    }
  }
}
