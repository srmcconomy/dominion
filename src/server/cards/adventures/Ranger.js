import Card from 'cards/Card';

export default class Ranger extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set('Action');
  async onPlay(player) {
    player.buys++;
    player.flipJourneyToken();
    if (player.journeyToken === 'faceUp') {
      await player.draw(5);
    }
  }
}
