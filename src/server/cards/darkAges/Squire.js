import Card from 'cards/Card';

export default class Squire extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money++;

    const choice = await player.selectOption(['+2 Actions', '+2 Buys', 'Gain a Silver'], 'Select one');
    switch (choice) {
      case 0:
        player.actions += 2;
        break;
      case 1:
        player.buys += 2;
        break;
      case 2:
        await player.gain('Silver');
        break;
      default:
        break;
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' && event.card === this && event.triggeringPlayer === player;
  }

  async onTrigger(event, player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 && s.cards.last().types.has('Attack')
      ),
      message: 'Choose a Attack card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }
}
