import Card from 'cards/Card';

export default class OvergrownEstate extends Card {
  name = 'Overgrown Estate';
  static VP = 0;
  static cost = new Card.Cost({ coin: 1 });
  static types = new Set(['Victory', 'Shelter']);
  static supplyCategory = 'nonSupply';
  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    player === event.triggeringPlayer &&
    event.cards.includes(this);
  }

  async onTrigger(event, player) {
    await player.draw(1);
  }
}
