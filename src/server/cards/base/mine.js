import Card from 'cards/Card';

export default class Mine extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards(0, 1, card => card.types.has('Treasure'));
    if (card)
    {
      const [supply] = await player.selectSupplies(1, 1 ,s => {
        return s.cards.size > 0 && (Card.classes.get(s.title).cost <= card.cost + 3);// && Card.classes.get(s.title).types.has('Treausre');
      });
      if (supply){
        await player.gain(supply.title);
      }
    }
  }
}
