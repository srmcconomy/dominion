import Card from 'cards/Card';

export default class Guide extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Reserve']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.moveCard(this, player.playArea, player.mats.tavern);
  }

  canTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.mats.tavern.includes(this);
  }

  async onTrigger(event, player) {
    while (player.hand.length > 0) {
      await player.discard(player.hand.last());
    }
    await player.draw(5);
    player.moveCard(this, player.mats.tavern, player.playArea);
  }
}
