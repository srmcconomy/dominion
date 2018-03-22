import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class BlessedVillage extends Card {
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
      const [boon] = await player.selectCards({
        min: 0,
        max: 1,
        pile: this.boons,
        message: 'Receive this Now?'
      });
      if (boon) {
        await player.receiveBoon(boon, this.boons);
      } else {
        player.addPersistentEffect('start-of-turn', this);
      }
    } else if (event.name === 'start-of-turn' && persistent === 'persistent') {
      while (this.boons.length > 0) {
        await player.receiveBoon(this.boons.last(), this.boons);
      }
      player.removePersistentEffect('start-of-turn', this);
    }
  }
}
