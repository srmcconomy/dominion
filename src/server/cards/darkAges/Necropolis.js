import Card from 'cards/Card';

export default class Necropolis extends Card {
  static cost = new Card.Cost({ coin: 1 });
  static types = new Set(['Action', 'Shelter']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.actions += 2;
  }
}
