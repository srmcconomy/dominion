import Card from 'cards/Card';

export default class FaithfulHound extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(2);
  }

  canTriggerOn(event, player) {
    return event.name === 'discard' &&
    player === event.triggeringPlayer &&
    event.cards.includes(this) &&
    player.turnPhase !== 'cleanUpPhase';
  }

  willTriggerOn(event, player) {
    return event.name === 'end-of-turn' &&
    event.triggeringPlayer === player &&
    player.asidePile.includes(this);
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'discard':
        player.setAside(this, player.hand);
        event.handledForCard.add(this);
        break;
      case 'end-of-turn':
        player.pickUp(this, player.asidePile);
        break;
      default:
        break;
    }
  }
}
