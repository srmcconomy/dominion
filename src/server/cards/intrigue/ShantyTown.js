import Card from 'cards/Card';

export default class ShantyTown extends Card {
  static cost = 3;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    // reveal hand
    if (!player.hand.some(card => card.types.has('Action'))) {
      await player.draw(2);
    }
  }
}
