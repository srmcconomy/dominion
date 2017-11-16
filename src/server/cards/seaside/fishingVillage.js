import Card from 'cards/Card';

export default class FishingVillage extends Card {
  static cost = 3;
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    player.actions += 2;
    player.money++;
  }
  async onTurnStart(player) {
  	player.actions++;
    player.money++;
    player.durationComplete(this);
  }
}
