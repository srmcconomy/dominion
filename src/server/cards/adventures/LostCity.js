import Card from 'cards/Card';

export default class LostCity extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action');
  async onPlay(player) {
    await player.draw(2);
    player.actions += 2;
  }

  willTriggerOn(event, player) {
    return event.name === 'gain' && event.triggeringPlayer === player && event.card === this;
  }

  async onTrigger(event, player) {
    await player.forEachOtherPlayer(async other => {
      await other.draw(1);
    });
  }
}
