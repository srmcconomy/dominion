import Card from 'cards/Card';

export default class Pawn extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    const options = [
      '+1 Card',
      '+1 Action',
      '+1 Buy',
      '+1 Coin',
    ];
    const effects = [
      () => player.draw(1),
      () => player.actions++,
      () => player.buys++,
      () => player.money++,
    ];
    for (let i = 0; i < 2; i++) {
      const choice = await player.selectOption(options, 'Choose two:');
      options.splice(choice, 1);
      await effects[choice]();
    }
  }
}
