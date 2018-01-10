import Card from 'cards/Card';

export default class Fairgrounds extends Card {
  static cost = { coin: 6 };
  static types = new Set(['Victory']);
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
  getVpValue(player) {
    const uniqueNames = [];
    player.deck.forEach(c => {
      if (!uniqueNames.includes(c.title)) uniqueNames.push(c.title);
    });
    return 2 * Math.floor(uniqueNames.length / 5);
  }
}
