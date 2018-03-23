import Card from 'cards/Card';

export default class Smugglers extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const previousPlayer = player.previousPlayer();
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      pile: [...previousPlayer.cardsGainedThisTurn],
      predicate: c => player.cardCostsLessThanEqualTo(c.cards.last(), { coin: 6 }),
    });

    if (card) {
      await player.gain(card.title);
    }
  }
}
