import Card from 'cards/Card';

export default class GhostShip extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.draw(2);
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', other, this)) {
        return;
      }
      while (other.hand.size >= 4) {
        const [card] = await other.selectCards({ min: 1, max: 1, message: 'Choose a card to place on top of your deck' });
        other.topDeck(card);
      }
    });
  }
}
