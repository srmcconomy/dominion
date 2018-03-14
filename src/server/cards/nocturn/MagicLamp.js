import Card from 'cards/Card';

export default class MagicLamp extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Treasure', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
    let singletonCount = 0;
    player.playArea.forEach(c => {
      if (player.playArea.filter(c2 => c2.title === c.title).length === 1) singletonCount++;
    });
    if (singletonCount >= 6) {
      if (player.playArea.includes(this)) {
        if (await player.trash(this, player.playArea)) {
          for (let i = 0; i < 3; i++) await player.gain('Wish');
        }
      }
    }
  }
}
