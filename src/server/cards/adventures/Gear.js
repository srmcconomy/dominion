import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Gear extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    await player.draw(2);
    this.aside = new Pile();
    const cards = await player.selectCards({
      min: 0,
      max: 2,
      message: 'Choose up to two cards to set aside',
    });
    if (cards.length > 0) {
      cards.forEach(card => player.moveCard(card, player.hand, this.aside));
      this.ignoreCleanUp = true;
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    this.ignoreCleanUp = false;
    while (this.aside.length > 0) {
      player.moveCard(this.aside.last(), this.aside, player.hand);
    }
  }
}
