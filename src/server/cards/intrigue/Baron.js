import Card from 'cards/Card';

export default class Baron extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.title === 'Estate',
      message: 'Choose an Estate to discard',
    });
    if (card) {
      await player.discard(card);
      player.money += 4;
    } else {
      await player.gain('Estate');
    }
  }
}
