import Card from 'cards/Card';

export default class Baker extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.coinTokens++;
  }

  static setup(game) {
    game.players.forEach(player => {
      player.coinTokens++
    });
  }
}
