import Card from 'cards/Card';

export default class SeaHag extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      const [card] = other.lookAtTopOfDeck(1);
      if (card) {
        await other.discard(card, other.deck);
      }
      await other.gain('Curse', other.deck);
    });
  }
}
