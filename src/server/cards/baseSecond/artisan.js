import Card from 'cards/Card';

export default class Artisan extends Card {
  static cost = 6;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => s.cards.size > 0 && Card.classes.get(s.title).cost <= 5,
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title, player.deck);
    }
  }
}
