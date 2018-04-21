import Card from 'cards/Card';

export default class ZombieApprentice extends Card {
  name = 'Zombie Apprentice';
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Zombie']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Action'),
      message: 'Select and Action card to trash'
    });
    if (card) {
      await player.trash(card);
      await player.draw(3);
      player.actions++;
    }
  }
}
