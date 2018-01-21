import Card from 'cards/Card';

export default class BridgeTroll extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Duration']);

  async onPlay(player) {
    await player.forEachOtherPlayer(other => {
      other.takeMinusCoinToken();
    });
    player.buys++;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    if (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this)) {
      return true;
    }
    if (event.name === 'card-cost' && event.triggeringPlayer === player && player.game.currentPlayer === player && player.playArea.includes(this)) {
      return { conflicts: false };
    }
    return false;
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'start-of-turn':
        this.ignoreCleanUp = false;
        player.buys++;
        break;
      case 'card-cost':
        event.costModifiers.push(cost => (cost.coin > 0 ? cost.subtract({ coin: 1 }) : cost));
        break;
    }
  }
}
