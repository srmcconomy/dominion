import Card from 'cards/Card';

export default class MiningVillage extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
    if (player.playArea.includes(this)) {
      if (await player.pickCard(this, player.playArea, 'Trash this for +$2?')) {
        await player.trash(this, player.playArea);
        player.money += 2;
      }
    }
  }
}
