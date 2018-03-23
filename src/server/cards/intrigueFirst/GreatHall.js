import Card from 'cards/Card';

export default class GreatHall extends Card {
  name = 'Great Hall';
  static cost = new Card.Cost({ coin: 3 });
  static VP = 1;
  static types = new Set(['Action', 'Victory']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
  }
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
}
