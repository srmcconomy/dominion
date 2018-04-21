import Card from 'cards/Card';

export default class BlessedVillage extends Card {
  name = 'Blessed Village';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Fate']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
  }

  willTriggerOn(event, player) {
    return ((event.name === 'gain' &&
    event.triggeringPlayer === player &&
    event.card === this) ||
    (event.name === 'start-of-turn' &&
    event.triggeringPlayer === player));
  }

  async onTrigger(event, player, persistent) {
    if (event.name === 'gain') {
      this.boons = await player.takeBoon(1, false);
      const boon = this.boons.last();
      if (this.boons.length > 0) {
        if (await player.pickCard(boon, this.boons, 'Receive this now?')) {
          await player.receiveBoon(boon, this.boons);
        } else {
          player.addPersistentEffect('start-of-turn', this);
        }
      }
    } else if (event.name === 'start-of-turn' && persistent === 'persistent') {
      while (this.boons.length > 0) {
        await player.receiveBoon(this.boons.last(), this.boons);
      }
      player.removePersistentEffect('start-of-turn', this);
    }
  }
}
