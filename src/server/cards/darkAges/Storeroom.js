import Card from 'cards/Card';

export default class Storeroom extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;

    const cards = await player.selectCards({
      min: 0,
      max: player.hand.size,
      message: 'Select Cards to discard for draw'
    });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
    await player.draw(cards.length);

    const cards2 = await player.selectCards({
      min: 0,
      max: player.hand.size,
      message: 'Select Cards to discard for coin'
    });
    for (let i = 0; i < cards2.length; i++) {
      await player.discard(cards2[i]);
    }
    player.money += cards2.length;
  }
}
