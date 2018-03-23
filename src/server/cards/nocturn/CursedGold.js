import Card from 'cards/Card';

export default class CursedGold extends Card {
  name = 'Cursed Gold';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Treasure', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money += 3;
    await player.gain('Curse')
  }
}
