import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Haven extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Duration']);

  async onPlay(player) {
    if (!this.setAside) this.setAside = new Pile();
    await player.draw(1);
    player.actions++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to set under Haven'
    });
    if (card) {
      player.moveCard(card, player.hand, this.setAside);
      this.ignoreCleanUp = true;
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    if (this.setAside) {
      while (this.setAside.length > 0) {
        player.pickUp(this.setAside.last(), this.setAside);
      }
    }
    this.ignoreCleanUp = false;
  }

  endGameCleanUp(player) {
    if (this.setAside) {
      while (this.setAside.size > 0) {
        player.moveCard(this.setAside.last(), this.setAside, player.deck);
      }
    }
  }
}
