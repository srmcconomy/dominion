import Card from 'cards/Card';

export default class JunkDealer extends Card {
  name = 'Junk Dealer';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a Card to Trash'
    });
    if (card) {
      await player.trash(card);
    }
  }
}
