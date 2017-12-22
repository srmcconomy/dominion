import Card from 'cards/Card';

export default class Island extends Card {
  static VP = 2;
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Victory']);

  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to place on your island mat'
    });
    player.moveCard(this, player.playArea, player.islandMat);
    if (card) player.moveCard(card, player.hand, player.islandMat);
  }

  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
}
