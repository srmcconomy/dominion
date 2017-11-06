import Card from 'cards/Card';

export default class Bureaucrat extends Card {
  static cost = 4;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.gain('Silver', 'deck');
    await player.forEachOtherPlayer(async other => {
      if (other.hand.some(card => card.types.has('Victory'))) {
        const [c] = await other.selectCards(1, 1, card => card.types.has('Victory'));
        other.topdeck(c);
      } else {
        // other.revealHand();
      }
    });
  }
}
