import Card from 'cards/Card';

export default class ThroneRoom extends Card {
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: card => card.types.has('Action'), message: 'Choose an Action card to play twice' });
    if (card) {
      await player.play(card);
      await player.pickUp(card);
      if (card) {
        await player.play(card);
      }
    }
  }
}
