import Card from 'cards/Card';

export default class MiningVillage extends Card {
  static cost = 4;
  static types = new Set(['Action', 'Victory']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
    const choice = await player.selectOption(['Trash the Mining Village', "Don't"]);
    if (choice === 0) {
      await player.trash(this, player.playArea);
      player.money += 2;
    }
  }
}
