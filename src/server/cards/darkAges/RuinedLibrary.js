import Card from 'cards/Card';

export default class RuinedLibrary extends Card {
  name = 'Ruined Library';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    await player.draw(1);
  }
}
