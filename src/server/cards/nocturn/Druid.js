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
      player.game.log(`${player.name} receives boon: ${boon.title}, ${player.game.boonPile.length} ${player.game.boonDiscardPile.length}`);
      player.boonsReceivedThisTurn.push(boon);
      await boon.effect(player, player.game.druidBoons);
      if (player.boonPile.includes(boon)) player.moveCard(boon, player.boonPile, player.game.druidBoons);
    }
  }
}
