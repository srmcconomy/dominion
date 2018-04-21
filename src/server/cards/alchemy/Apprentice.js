import Card from 'cards/Card';

export default class Apprentice extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to trash'
    });
    if (card) {
      await player.trash(card);
      const cost = await player.getCardCost(card);
      await player.draw(cost.coin + (cost.potion ? 2 : 0));
    }
  }
}
