import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Crypt extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Night', 'Duration']);
  async onPlay(player) {
    if (!this.setAside) this.setAside = [];
    this.setAside.push(new Pile());
    const cards = await player.selectCards({
      min: 0,
      max: player.playArea.filter(c => c.types.has('Treasure')).length,
      pile: player.playArea,
      message: 'Select cards to set aside under this'
    });
    cards.forEach(c => player.moveCard(c, player.playArea, this.setAside[this.setAside.length - 1]));

    this.setAside.forEach(p => (this.ignoreCleanUp = this.ignoreCleanUp || (p.length > 0)));
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' &&
     event.triggeringPlayer === player &&
      player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    for (let i = 0; i < this.setAside.length; i++) {
      if (this.setAside.length > 0) {
        const [card] = await player.selectCards({
          min: 1,
          max: 1,
          pile: this.setAside[i],
          message: 'Select a card to put into your hand'
        });
        player.pickUp(card, this.setAside[i]);
      }

      if (this.setAside[i].length === 0) this.ignoreCleanUp = false;
    }
  }
}
