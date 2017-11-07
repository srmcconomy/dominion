import Card from 'cards/Card';

export default class Remodel extends Card {
  static cost = 4;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards(1, 1);
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies(1, 1 ,s => {
        return s.cards.size > 0 && (Card.classes.get(s.title).cost <= card.cost + 2);
      });
      if (supply){
        await player.gain(supply.title);
      }
    }
  }
}
