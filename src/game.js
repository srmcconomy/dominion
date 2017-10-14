import { List } from 'immutable';
import { Copper, Estate } from './cards/basic';
import OrderedMap from './ordered-map';
import EventEmitter from './event-emitter';

export default class Game extends EventEmitter {
  start() {
    this.players.forEach(player => {
      player.game = this;
      player.deck = new OrderedMap([
        ...Array(7).fill().map(() => {
          const card = new Copper();
          return {
            key: card.id,
            value: card,
          };
        }),
        ...Array(3).fill().map(() => {
          const card = new Estate();
          return {
            key: card.id,
            value: card,
          };
        }),
      ]).shuffle();
    });
    this.currentPlayerIndex = Math.random() * players.size | 0;
    this.currentPlayer = this.players.get(this.currentPlayerIndex);
  }

  async loop() {
    this.players.forEach(player => player.draw(5));
    for (;;) {
      await this.currentPlayer.takeTurn();
      this.currentPlayerIndex++;
      if (this.currentPlayerIndex === this.players.size) {
        this.currentPlayerIndex = 0;
      }
      this.currentPlayer = this.players.get(this.currentPlayerIndex);
    }
  }
}
