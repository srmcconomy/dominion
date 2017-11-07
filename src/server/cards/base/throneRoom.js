import Card from 'cards/Card';

export default class ThroneRoom extends Card {
  // static title = 'Throne Room';
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards(0,1, card => {
      return (card.types.has('Action'));// && card.id !== this.id);
    });
    if (card) {
      await player.play(card);
      await player.pickUp(card);
      if (card) {
        await player.play(card);
      }
    }
  }
}
