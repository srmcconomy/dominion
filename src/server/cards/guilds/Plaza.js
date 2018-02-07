import Card from 'cards/Card';

export default class Plaza extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Treasure'),
      message: 'Select a treasure to discard'
    });
    if (card) {
      await player.discard(card);
      player.coinTokens++;
    }
  }
}
