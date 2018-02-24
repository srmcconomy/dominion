import Card from 'cards/Card';

export default class Champion extends Card {
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    player.actions++;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return player.playArea.includes(this) && (
      (event.name === 'play' && event.triggeringPlayer === player && event.card.types.has('Action') && event.card !== this) ||
      (event.name === 'play-first' && event.triggeringPlayer !== player && event.card.types.has('Attack'))
    );
  }

  async onTrigger(event, player) {
    if (event.triggeringPlayer === player) {
      player.actions++;
    } else {
      event.handledByPlayer.set(player, true);
    }
  }
}
