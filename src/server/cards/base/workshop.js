import Card from 'cards/Card';

export default class Workshop extends Card {
  static cost = 3;
  static types = new Set(['Action']);
  async onPlay(player) {
  	const [supply] = await player.selectSupplies(1, 1 ,s => {
      return s.cards.size > 0 && (Card.classes.get(s.title).cost <= 4);
    });
    if (supply){
    	await player.gain(supply.title);
    }
  }
}
