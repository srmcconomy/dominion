import Card from 'cards/Card';

export default class Imp extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Spirit']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    await player.draw(2);
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => (c.types.has('Action') && !player.playArea.some(c2 => c2.title === c.title)),
      message: 'Select an action to play'
    });
    if (card) {
      await player.play(card);
    }
  }
}
