import Card from 'cards/Card';

export default class TreasureMap extends Card {
  static cost = 4;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.trash(this, player.playArea);
    for (let i = 0; i < player.hand.size; i++) {
      if(player.hand.list[i].title === 'TreasureMap') {
        player.trash(player.hand.list[i]);
        for (let i = 0; i < 4; i++) {
          player.gain('Gold', player.deck);
        }
        break;
      }
    }
  }
}
