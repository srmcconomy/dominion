import Card from 'cards/Card';

export default class ThroneRoom extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: c => c.types.has('Action'), message: 'Choose an Action card to play twice' });
    if (!this.cards) this.cards = [];
    if (card) {
      await player.play(card);
      await player.play(card, player.playArea);
      if (player.playArea.hasID(card.id) && card.types.has('Duration') && card.ignoreCleanUp) {
        this.cards.push(card);
        this.ignoreCleanUp = card.ignoreCleanUp || this.ignoreCleanUp;
      }
    }
  }
}
