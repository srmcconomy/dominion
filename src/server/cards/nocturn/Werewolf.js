import Card from 'cards/Card';

export default class Werewolf extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Night', 'Attack', 'Doom']);
  async onPlay(player, event) {
    if (player.turnPhase === 'nightPhase') {
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
    } else {
      await player.draw(3);
    }
  }
}
