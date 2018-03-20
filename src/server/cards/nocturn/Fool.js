import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Fool extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    if (player.game.lostInTheWoods.player !== player) {
      player.game.lostInTheWoods.player = player;
      this.boons = new Pile();
      while (this.boons.length < 3 && player.game.boonPile.length > 0) {
        player.moveCard(player.game.boonPile.last(), player.game.boonPile, this.boons);
      }
      if (this.boons.length < 3) {
        player.moveCard(player.game.boonDiscardPile, player.game.boonPile, { num: player.game.boonDiscardPile.size });
        player.game.boonPile.shuffle();
      }
      while (this.boons.length < 3 && player.game.boonPile.length > 0) {
        player.moveCard(player.game.boonPile.last(), player.game.boonPile, this.boons);
      }

      while (this.boons.length > 0) {
        const [boon] = await player.selectCards({
          min: 1,
          max: 1,
          pile: this.boons,
          message: 'Select a boon to receive'
        });
        player.game.log(`${player.name} receives boon: ${boon.title}, ${player.game.boonPile.length} ${player.game.boonDiscardPile.length}`);
        player.boonsReceivedThisTurn.push(boon);
        await boon.effect(player);
        if (this.boons.includes(boon)) player.moveCard(boon, this.boons, player.game.boonDiscardPile);
      }
    }
  }
}
