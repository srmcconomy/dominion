import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Ghost extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Night', 'Duration', 'Spirit']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    if (!this.setAside) this.setAside = new Pile(); // Pile of cards set on Ghost to be played next turn
    const aside = new Pile(); // Pile of cards revealed while looking for an action
    let done = false;
    while ((done === false) && (player.deck.size + player.discardPile.size > 0)) {
      const [card] = await player.draw(1, false);
      if (card.types.has('Action')) {
        this.setAside.push(card);
        this.ignoreCleanUp = true;
        done = true;
      } else aside.push(card);
    }
    await player.discardAll([...aside], aside);
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' &&
    event.triggeringPlayer === player &&
    player.playArea.includes(this) &&
    this.setAside.length > 0;
  }

  async onTrigger(event, player) {
    for (let i = 0; i < this.setAside.length; i++) {
      await player.playMultiple(this, 2, this.setAside._list[i], this.setAside);
    }
    this.setAside.clear();
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
