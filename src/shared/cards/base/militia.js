import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Militia extends Card {
  name = 'Militia';
  cost = 4;
  types = new Set(['Action', 'Attack']);
  async onPlay(game) {
    game.currentPlayer.money += 2;
    await game.forEachOtherPlayer(async player => {
      if (player.hand.size > 3) {
        const cards = await player.selectCards(player.hand.count - 3, 'Select cards to discard');
        cards.forEach(card => player.discard(card));
      }
    });
  }
}
