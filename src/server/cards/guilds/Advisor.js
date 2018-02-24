import Card from 'cards/Card';

export default class Advisor extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = await player.draw(3, false);
    player.game.log(`${player.name} reveals ${cards.map(c => c.title).join(', ')}`);
    const [card] = await player.nextPlayer().selectCards({
      min: 1,
      max: 1,
      pile: cards,
      message: `Select what card ${player.name} discards`
    });

    if (card) await player.discard(card, cards);

    while (cards.length > 0) {
      player.moveCard(cards.last(), cards, player.hand);
    }
  }
}
