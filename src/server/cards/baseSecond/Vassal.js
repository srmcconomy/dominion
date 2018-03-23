import Card from 'cards/Card';

export default class Vassal extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;

    const cards = await player.draw(1, false);
    const card = cards.last();

    if (card) await player.discard(card, cards);
    if (player.discardPile.length > 0) {
      if (player.discardPile.last() === card && card.types.has('Action')) {
        if (await player.pickCard(card, player.discardPile, 'Play Action Card?')) {
          await player.play(card, player.discardPile);
        }
      }
    }
  }
}
