import Card from 'cards/Card';

export default class TragicHero extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
    player.buys++;
    if (player.hand.length >= 8) {
      if (player.playArea.includes(this)) await player.trash(this, player.playArea);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (s.cards.size > 0 ? s.cards.last().types.has('Treasure') : false),
        message: 'Choose an Treasure card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    }
  }
}
