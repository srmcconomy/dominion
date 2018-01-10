import Card from 'cards/Card';

export default class Salvager extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to trash'
    });
    player.money += card.cost.coin;
    await player.trash(card);
  }
}
