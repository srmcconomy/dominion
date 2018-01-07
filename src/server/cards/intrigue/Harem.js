import Card from 'cards/Card';

export default class Harem extends Card {
  static value = 2;
  static VP = 2;
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set(['Treasure', 'Victory']);
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
  onPlay(player) {
    player.money += 2;
  }
}
