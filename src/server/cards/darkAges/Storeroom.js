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
    await player.discardAll([...cards]);
    await player.draw(cards.length);

    const cards2 = await player.selectCards({
      min: 0,
      max: player.hand.size,
      message: 'Select Cards to discard for coin'
    });
    await player.discardAll([...cards2]);
    player.money += cards2.length;
  }
}
