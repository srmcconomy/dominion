import Card from 'cards/Card';

export default class Masquerade extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(2);
    const promises = player.game.playerOrder.map(other =>
      other.selectCards({
        min: 1,
        max: 1,
        message: 'Select a card to pass to your left'
      })
    );
    const cards = (await Promise.all(promises)).map(a => a[0]);
    for (let i = 0; i < cards.length; i++) {
      const other = player.game.playerOrder[i];
      const whereToPass = i === 0 ? cards.length - 1 : i - 1;
      if (cards[i]) {
        other.moveCard(cards[i], other.hand, player.game.playerOrder[whereToPass].hand);
        other.cardsOwned.delete(cards[i]);
        player.game.playerOrder[whereToPass].cardsOwned.push(cards[i]);
      }
    }
    const [card] = await player.selectCards({ min: 0, max: 1, message: 'Select a card to trash' });
    if (card) await player.trash(card);
  }
}
