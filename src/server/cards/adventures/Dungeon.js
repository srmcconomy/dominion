import Card from 'cards/Card';

export default class Dungeon extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    player.actions++;
    await this.effect(player);
    this.ignoreCleanUp = true;
  }

  async effect(player) {
    await player.draw(2);
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      message: 'Choose two cards to discard',
    });
    for (const card of cards) {
      await player.discard(card);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    this.ignoreCleanUp = false;
    await this.effect(player);
  }
}
