import Card from 'cards/Card';

export default class Amulet extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    this.ignoreCleanUp = true;
    await this.effect(player);
  }

  async effect(player) {
    const options = {
      '+1 Coin': () => player.money++,
      'Trash a card from your hand': async () => {
        const [card] = await player.selectCards({
          min: 1,
          max: 1,
          message: 'Choose a card to trash',
        });
        if (card) {
          await player.trash(card);
        }
      },
      'Gain a Silver': async () => {
        await player.gain('Silver');
      },
    };
    const keys = Object.keys(options);
    const choice = await player.selectOption(keys);
    await options[keys[choice]]();
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    this.ignoreCleanUp = false;
    await this.effect(player);
  }
}
