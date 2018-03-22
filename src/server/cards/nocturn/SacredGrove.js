import Card from 'cards/Card';

export default class SacredGrove extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    player.buys++;
    player.money += 3;
    const boon = await player.takeBoon();
    if (player.game.boonDiscardPile.last() === boon) {
      await player.forEachOtherPlayer(async other => {
        const [card] = await player.selectCards({
          min: 0,
          max: 1,
          pile: player.game.boonDiscardPile.filter(b => b === boon),
          message: 'Receive Boon?'
        });
        if (card) {
          await other.receiveBoon(boon, player.game.boonDiscardPile);
        }
      });
    }
  }
}
