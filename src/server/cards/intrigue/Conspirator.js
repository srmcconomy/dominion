import Card from 'cards/Card';

export default class Conspirator extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    if (player.cardsPlayedThisTurn.filter(c => c.types.has('Action')).length >= 3) {
      await player.draw(1);
      player.actions++;
    }
  }
}
