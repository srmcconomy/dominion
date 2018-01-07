import Card from 'cards/Card';

export default class Pawn extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const choices = {
      '+1 Card': () => player.draw(1),
      '+1 Action': () => player.actions++,
      '+1 Buy': () => player.buys++,
      '+1 Coin': () => player.money++,
    };
    const keys = Object.keys(choices);
    for (let i = 0; i < 2; i++) {
      const choice = await player.selectOption(keys, 'Choose two:');
      await choices[keys[choice]]();
      keys.splice(choice, 1);
    }
  }
}
