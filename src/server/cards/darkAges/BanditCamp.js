import Card from 'cards/Card';

export default class BanditCamp extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
    await player.gain('Spoils');
  }

  static getDependencies() {
    return ['Spoils'];
  }
}
