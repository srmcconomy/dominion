import Card from 'cards/Card';

export default class Druid extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    player.buys++;

    const [boon] = await player.selectCards({
      min: 1,
      max: 1,
      pile: player.game.druidBoons,
      message: 'Select a Druid Boon to receive'
    });

    if (boon) {
      player.boonsReceivedThisTurn.push(boon);
      await boon.effect(player);
      if (player.boonPile.includes(boon)) player.moveCard(boon, player.boonPile, player.game.druidBoons);
    }
  }
}
