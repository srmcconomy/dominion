import Card from 'cards/Card';

export default class Fool extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    if (player.game.lostInTheWoods.player !== player) {
      player.game.log(`${player.name} is now Lost in the Woods`);
      player.game.lostInTheWoods.player = player;
      this.boons = await player.takeBoon(3, false);

      while (this.boons.length > 0) {
        const [boon] = await player.selectCards({
          min: 1,
          max: 1,
          pile: this.boons,
          message: 'Select a boon to receive'
        });
        await player.receiveBoon(boon, this.boons);
      }
    }
  }
}
