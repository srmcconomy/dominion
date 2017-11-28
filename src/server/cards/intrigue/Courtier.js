import Card from 'cards/Card';

export default class Courtier extends Card {
  static cost = 4;
  static types = new Set(['Action', 'Victory']);
  async onPlay(player) {
    const [card] = await player.selectCard({
      min: 1,
      max: 1,
      predicate: () => true,
      message: 'Choose a card to reveal',
    });
    if (!card) {
      return;
    }
    const choices = {
      '+1 Action': () => player.actions++,
      '+1 Buy': () => player.buys++,
      '+3 coin': () => { player.money += 3; },
      'Gain a Gold': () => player.gain('gold'),
    };
    const keys = Object.keys(choices);
    const numChoices = Math.min(card.types.size, keys.length);
    for (let i = 0; i < numChoices; ++i) {
      const choice = await player.selectOption(keys, `Choose ${numChoices}`);
      await choices[keys[choice]]();
      keys.splice(choice, 1);
    }
  }
}
