import Card from 'cards/Card';

export default class FishingVillage extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    player.actions += 2;
    player.money++;
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    player.actions++;
    player.money++;
    this.ignoreCleanUp = false;
  }
}
