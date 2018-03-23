import Card from 'cards/Card';

export default class ShantyTown extends Card {
  name = 'Shanty Town';
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    player.revealHand();
    if (!player.hand.some(card => card.types.has('Action'))) {
      await player.draw(2);
    }
  }
}
