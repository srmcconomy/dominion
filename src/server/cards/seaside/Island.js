import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Island extends Card {
  static VP = 2;
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Victory']);

  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to place on your island mat'
    });
    player.moveCard(this, player.playArea, player.mats.island);
    if (card) player.moveCard(card, player.hand, player.mats.island);
  }
}
