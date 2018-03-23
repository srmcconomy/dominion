import Card from 'cards/Card';

export default class HornOfPlenty extends Card {
  name = 'Horn of Plenty';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Treasure']);
  async onPlay(player) {
    const uniqueNames = [];
    player.playArea.forEach(c => {
      if (!uniqueNames.includes(c.title)) uniqueNames.push(c.title);
    });
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: uniqueNames.length })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
      if (supply.cards.last().types.has('Victory')) {
        await player.trash(this, player.playArea);
      }
    }
  }
}
