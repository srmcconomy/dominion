import Card from 'cards/Card';

export default class Mine extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: card => card.types.has('Treasure'), message: 'Choose a Treasure card to trash' });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({ min: 1, max: 1, predicate: s => ((s.cards.size > 0) && (Card.classes.get(s.title).cost <= card.cost + 3) && Card.classes.get(s.title).types.has('Treasure')), message: 'Choose an treasure card to gain' });
      if (supply){
        await player.gain(supply.title);
      }
    }
  }
}
