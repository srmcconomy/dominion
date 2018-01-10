import Card from 'cards/Card';

export default class TreasureMap extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.trash(this, player.playArea);
    const otherCard = player.hand.list.find(c => c.title === 'TreasureMap');
    if (otherCard) {
      player.trash(otherCard);
      for (let i = 0; i < 4; i++) {
        player.gain('Gold', player.deck);
      }
    }
  }
}
