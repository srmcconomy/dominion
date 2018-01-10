import Card from 'cards/Card';

export default class DistantLands extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set('Action', 'Reserve', 'Victory');
  async onPlay(player) {
    player.moveCard(this, player.playArea, player.mats.tavern);
  }
}
