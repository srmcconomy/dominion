import Card from 'cards/Card';

export default class Butcher extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.coinTokens += 2;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Select a card to trash'
    });
    if (card) {
      await player.trash(card);
      let coinTokensPaid = 0;
      let done = false;
      while (player.coinTokens > 0 && done === false) {
        const choice = await player.selectOption(['Pay a Coin token', 'Pay no more']);
        switch (choice) {
          case 0:
            player.coinTokens--;
            coinTokensPaid++;
            break;
          case 1:
            done = true;
            break;
          default:
            break;
        }
      }
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (s.cards.length > 0 ? (
          player.cardCostsLessThanEqualTo(s.cards.last(), { coin: card.cost.coin + coinTokensPaid })
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    }
  }
}
