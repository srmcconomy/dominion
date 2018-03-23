import Card from 'cards/Card';

export default class MarketSquare extends Card {
  name = 'Market Square';
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.buys++;
  }

  canTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    player.hand.includes(this);
  }

  async onTrigger(event, player) {
    await player.discard(this);
    await player.gain('Gold');
  }
}
