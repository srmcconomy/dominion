import { nonenumerable } from 'core-decorators';

import AsyncSocket from 'utils/AsyncSocket';
import Model from 'models/Model';

export default function (Class) {
  return class Player extends Class {
    @nonenumerable
    socket = null;

    constructor(name, game, socket) {
      super(name, game);

      this.hand.toJSON = () => this.hand.size;
      this.deck.toJSON = () => this.deck.size;
      this.discardPile.toJSON = () => (this.discardPile.size === 0 ? null : this.discardPile.last().id);

      this.socket = new AsyncSocket(socket);
      this.socket.onReconnect(() => this.socket.emit('state', this.game));
    }

    setSocket(socket) {
      this.socket.setSocket(socket);
    }

    async getInputAndNotifyDirty(payload, validate) {
      console.log('get-input');
      const dirty = this.game.createDirty();
      await this.forEachOtherPlayer(player => {
        let newDirty = dirty;
        if (player._dirty.has('hand')) {
          newDirty = { ...dirty, hand: player.hand.toIDArray() };
        }
        player.socket.emit('get-input', { payload: { type: 'clear-input' }, dirty: newDirty });
      });
      if (this._dirty.has('hand')) {
        dirty.hand = this.hand.toIDArray();
      }
      this.game.clean();
      for (;;) {
        console.log('loop');
        const selected = await this.socket.emitAndWait('get-input', {
          payload,
          dirty,
        });
        console.log('selected');
        console.log(selected);
        if (validate(selected)) return selected;
      }
    }

    async selectCards(min, max, predicate, from = 'hand') {
      console.log('select-cards');
      const filteredCards = predicate ? this[from].filter(predicate) : this[from];
      if (filteredCards.size === 0) {
        return [];
      }
      const payload = {
        type: 'select-cards',
        min,
        max,
        cards: filteredCards.toIDArray(),
      };
      const ids = await this.getInputAndNotifyDirty(payload, arr => arr.every(id => filteredCards.hasID(id)));
      return ids.map(id => Model.fromID(id));
    }

    async selectSupplies(min, max, predicate) {
      const filteredSupplies = [...this.game.supplies.values()].filter(predicate);
      if (filteredSupplies.size === 0) {
        return [];
      }
      const payload = {
        type: 'select-supplies',
        min,
        max,
        supplies: filteredSupplies.map(supply => supply.title),
      };
      const names = await this.getInputAndNotifyDirty(payload, arr => arr.every(name => filteredSupplies.some(supply => supply.title === name)));
      return names.map(name => this.game.supplies.get(name));
    }

    async revealHand() {
      await Promise.resolve(this);
    }
  };
}
