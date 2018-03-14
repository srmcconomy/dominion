import Card from 'cards/Card';

export default class Shepherd extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = await player.selectCards({
      min: 0,
      max: player.hand.length,
      predicate: c => c.types.has('Victory'),
      message: 'Select Victory cards to discard'
    });
    await player.discardAll([...cards]);
    player.game.log(`${player.name} discards: ${cards.map(c => c.title).join(', ')}`);
    await player.draw(cards.length * 2);
  }
}
