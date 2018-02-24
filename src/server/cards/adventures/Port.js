import Card from 'cards/Card';

export default class Port extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    await player.gain('Port');
  }
}
