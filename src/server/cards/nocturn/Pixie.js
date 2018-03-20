import Card from 'cards/Card';

export default class Pixie extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    if (player.game.boonPile.length === 0) {
      player.moveCard(player.game.boonDiscardPile, player.game.boonPile, { num: player.game.boonDiscardPile.size });
      player.game.boonPile.shuffle();
    }
    const boon = player.game.boonPile.last();
    player.game.log(`Top Boon is: ${boon.title}`);
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      pile: player.game.boonPile.filter(b => b === boon),
      message: 'Trash Pixie to receive this twice?'
    });
    if (card) {
      await player.receiveBoon();
      player.boonsReceivedThisTurn.push(boon);
      await boon.effect(player);
    } else {
      player.moveCard(boon, player.game.boonPile, player.game.boonDiscardPile);
    }
  }
}
