import Card from 'cards/Card';

export default class Duplicate extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Reserve']);
  async onPlay(player) {
    player.moveCard(this, player.playArea, player.mats.tavern);
  }

  canTriggerOn(event, player) {
    return event.name === 'gain' && event.triggeringPlayer === player && player.mats.tavern.includes(this) && event.card.cost.isLessThanEqualTo({ coin: 6 });
  }

  async onTrigger(event, player) {
    await player.gain(event.card.title);
  }
}
