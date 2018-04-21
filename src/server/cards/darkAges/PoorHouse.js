import Card from 'cards/Card';

export default class PoorHouse extends Card {
  name = 'Poor House';
  static cost = new Card.Cost({ coin: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.revealHand();
    const treasureCount = player.hand.filter(c => c.types.has('Treasure')).length;
    player.money += Math.max(0, 4 - treasureCount);
  }
}
