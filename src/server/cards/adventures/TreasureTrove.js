import Card from 'cards/Card';

export default class TreasureTrove extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Treasure');
  async onPlay(player) {
    player.money += 2;
    await player.gain('Copper');
    await player.gain('Gold');
  }
}
