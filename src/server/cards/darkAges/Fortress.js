import Card from 'cards/Card';

export default class Fortress extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    event.cards.includes(this);
  }

  async onTrigger(event, player) {
    player.game.log(`${player.name}'s Fortress returns to their hand`);
    player.moveCard(this, event.from, player.hand);
    event.handledForCard.add(this);
  }
}
