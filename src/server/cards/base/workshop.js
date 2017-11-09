import Card from 'cards/Card';

export default class Workshop extends Card {
  static cost = 3;
  static types = new Set(['Action']);
  async onPlay(player) {
  	const [supply] = await player.selectSupplies({ min: 1, max: 1, predicate: s => ((s.cards.size > 0) && (Card.classes.get(s.title).cost <= 4)), message: 'Choose an card to gain' });
    if (supply){
    	await player.gain(supply.title);
    }
  }
}
