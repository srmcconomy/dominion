import Card from 'cards/Card';

export default class Duplicate extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Reserve']);
  async onPlay(player) {
    player.putOnTavernMat(this);
  }

  async canTriggerOn(event, player) {
    return event.name === 'gain' && event.triggeringPlayer === player && player.mats.tavern.includes(this) && await player.cardCostsLessThanEqualTo(event.card, { coin: 6 });
  }

  async onTrigger(event, player) {
    player.moveCard(this, player.mats.tavern, player.playArea);
    await player.gain(event.card.title);
  }
}
