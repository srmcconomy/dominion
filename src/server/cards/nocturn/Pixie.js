import Card from 'cards/Card';

export default class Pixie extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const boons = await player.takeBoon(1, false);
    const boon = boons.last();
    player.game.log(`${player.name} looks at boon: ${boon.title}`);
    if (await player.pickCard(boon, boons, 'Trash Pixie to receive this twice?')) {
      await player.receiveBoon(boon, boons);
      await player.receiveBoon(boon, boons);
    } else {
      player.moveCard(boon, boons, player.game.boonDiscardPile);
    }
  }
}
