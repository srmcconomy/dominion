import Card from 'cards/Card';

export default class Forager extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    player.buys++;

    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a Card to Trash'
    });
    if (card) {
      await player.trash(card);
    }

    const uniqueTrashedTreasures = [];
    player.game.trash.forEach(c => {
      if (!uniqueTrashedTreasures.includes(c.title) && c.types.has('Treasure')) {
        uniqueTrashedTreasures.push(c.title);
      }
    });
    player.money += uniqueTrashedTreasures.length;
    player.game.log(`${this.title} is worth ${uniqueTrashedTreasures.length}: (${uniqueTrashedTreasures.join(', ')}).`);
  }
}
