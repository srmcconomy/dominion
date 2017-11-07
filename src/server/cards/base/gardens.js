import Card from 'cards/Card';

export default class Gardens extends Card {
  static cost = 4;
  static types = new Set(['Victory']);
    static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
  // get vp() {
  //   return this.calculateVP();
  // }
  // calculateVP() {
  //   return 0;
  // }
  // async onGain(player) {
  //   this.calculateVP = () => player.cards.size / 10 | 0;
  // }
}
