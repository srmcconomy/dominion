import Card from 'cards/Card';

export default class RuinedVillage extends Card {
  name = 'Ruined Village';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.actions++;
  }
}
