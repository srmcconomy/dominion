import EventEmitter from 'utils/EventEmitter';
import Model from 'models/Model';
import Pile from 'utils/Pile';
import Card from 'cards/Card';

@EventEmitter
export default class Supply extends Model {
  constructor(title, game) {
    super();
    this.title = title;
    const CardClass = Card.classes.get(title);
    this.cards = new Pile();
    this.cards.push(...Array(CardClass.getNumberInSupply(game)).fill().map(() => new CardClass(game)));
    this.cards.on('dirty', () => {
      console.log(this.cards);
      this._dirty.cards = true;
      this.emit('dirty');
    });
    this._tokens = {};
    this._dirty = {};
  }

  createDirty() {
    const dirty = {};
    Object.keys(this._dirty).forEach(key => {
      dirty[key] = this[key];
    });
    return dirty;
  }
}
