import Card from 'cards/Card';

export default class Mine extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards(0, 1, card => card.types.has('Treasure'));
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies(1, 1, supply => {
        return supply.cards.size > 0 && (Card.classes.get(supply.title).cost <= card.cost + 3) && supply.cards.last().types.has('Treasure');
      });
      if (supply){
        await player.gain(supply.title);
      }
    }
  }
}
