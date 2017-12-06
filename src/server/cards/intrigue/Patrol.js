import Card from 'cards/Card';

export default class Patrol extends Card {
  static cost = {coin:5};
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
    const cards = player.lookAtTopOfDeck(4);
    cards.filter(c => c.types.has('Victory') || c.types.has('Curse'))
      .forEach(c => player.moveCard(c, player.deck, player.hand));
  }
}
