import Card from 'cards/Card';

export default class Nobles extends Card {
  static cost = { coin: 6 };
  static VP = 2;
  static types = new Set(['Action', 'Victory']);
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
  async onPlay(player) {
    const choice = await player.selectOption(['+3 Cards', '+2 Actions']);
    switch (choice) {
      case 0:
        await player.draw(3);
        break;
      case 1:
        player.actions += 2;
        break;
      default:
        break;
    }
  }
}
