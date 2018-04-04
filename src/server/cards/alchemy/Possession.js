import Card from 'cards/Card';

export default class Possession extends Card {
  static cost = new Card.Cost({ coin: 6, potion: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    // TO DO
  }
}
