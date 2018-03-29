import Card from 'cards/Card';

export default class Skulk extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack', 'Doom']);
  async onPlay(player, event) {
    player.buys++;

    const hexs = await player.takeHex(1, false);
    const hex = hexs.last();
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.receiveHex(hex, hexs);
    });
    if (hexs.includes(hex)) { // All players blocked it, still needs to find it's way to discardPile
      player.moveCard(hex, hexs, player.game.hexDiscardPile);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'gain' &&
    event.triggeringPlayer === player &&
    event.card === this;
  }

  async onTrigger(event, player) {
    await player.gain('Gold');
  }
}
