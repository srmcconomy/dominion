import Card from 'cards/Card';

export default class BandOfMisfits extends Card {
  name = 'Band of Misfits';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
//   async onPlay(player) {
//     const [supply] = await player.selectSupplies({
//       min: 1,
//       max: 1,
//       predicate: s => s.cards.size > 0 && s.cards.last().types.has('Action'),
//       message: `Choose an action that costs less than ${this.cost.coin}`
//     });
//     if (supply) {
      
//     }
//   }
}
