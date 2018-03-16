import Card from 'cards/Card';

export default class Conclave extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => (c.types.has('Action') && !player.playArea.some(c2 => c2.title === c.title)),
      message: 'Select an action to play'
    });
    if (card) {
      await player.play(card);
      player.actions++;
    }
  }
}
