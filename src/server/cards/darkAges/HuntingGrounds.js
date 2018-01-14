import Card from 'cards/Card';

export default class HuntingGrounds extends Card {
  static cost = { coin: 6 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(4);
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    const choice = await player.selectOption(['Gain Duchy', 'Gain 3 Estates']);
    switch (choice) {
      case 0:
        await player.gain('Duchy');
        break;
      case 1:
        for (let i = 0; i < 3; i++) {
          await player.gain('Estate');
        }
        break;
      default:
        break;
    }
  }
}
