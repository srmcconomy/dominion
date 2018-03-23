import Card from 'cards/Card';

export default class SacredGrove extends Card {
  name = 'Sacred Grove';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    player.buys++;
    player.money += 3;
    const boon = await player.takeBoon();
    if (player.game.boonDiscardPile.last() === boon) {
      await player.forEachOtherPlayer(async other => {
        if (await other.pickCard(boon, player.game.boonDiscardPile, 'Receive Boon?')) {
          await other.receiveBoon(boon, player.game.boonDiscardPile);
        }
      });
    }
  }
}
