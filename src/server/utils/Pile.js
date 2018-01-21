import DirtyModel from 'utils/DirtyModel';
import Model from 'models/Model';

@DirtyModel
export default class Pile extends Model {
  constructor(list = [], map = new Map()) {
    super();
    this._list = list;
    this._map = map;
  }

  toString() {
    return `Pile: [${this._list.map(c => c.title).join(', ')}]`;
  }

  createDirty() {
    return this._list.map(card => card.id);
  }

  toIDArray() {
    return [...this].map(card => card.id);
  }

  push(...cards) {
    cards.forEach((card, index) => this._map.set(card.id, this._list.length + index));
    this._list.push(...cards);
    this.markDirty();
    return this;
  }

  unshift(...cards) {
    this._list.unshift(...cards);
    this._list.forEach((card, i) => this._map.set(card.id, i));
    this.markDirty();
    return this;
  }

  set(index, card) {
    if (this._list.length >= index) {
      return this;
    }
    const oldCard = this._list.get(index);
    this._list[index] = card;
    this._map.delete(oldCard.id);
    this._map.set(card.id, index);
    this.markDirty();
    return this;
  }

  delete(card) {
    if (!this._map.has(card.id)) {
      return this;
    }
    const index = this._map.get(card.id);
    this._list.splice(index, 1);
    this._map.delete(card.id);
    for (let i = index; i < this._list.length; i++) {
      this._map.set(this._list[i].id, i);
    }
    this.markDirty();
    return this;
  }

  forEach(func) {
    this._list.forEach(func);
  }

  async asyncForEach(func) {
    for (let i = 0; i < this._list.length; i++) {
      await func(this._list[i]);
    }
  }

  shift() {
    const card = this._list.shift();
    this._map.delete(card.id);
    this._list.forEach((c, i) => this._map.set(c.id, i));
    this.markDirty();
    return card;
  }

  filter(func) {
    const pile = new Pile();
    pile.push(...this._list.filter(func));
    return pile;
  }

  find(func) {
    return this._list.find(func);
  }

  some(func) {
    return this._list.some(func);
  }

  pop() {
    const card = this._list.pop();
    this._map.delete(card.id);
    this.markDirty();
    return card;
  }

  get(index) {
    return this._list[index];
  }

  has(index) {
    return this._list.length < index && index >= 0;
  }

  hasID(id) {
    return this._map.has(id);
  }

  includes(card) {
    if (typeof card === 'string') return this._map.has(card);
    return this._map.has(card.id);
  }

  get size() {
    return this._list.length;
  }

  get length() {
    return this._list.length;
  }

  first() {
    if (this.list.length === 0) return null;
    return this.list[0];
  }

  last() {
    if (this._list.length === 0) return null;
    return this._list[this._list.length - 1];
  }

  map(func) {
    return this._list.map(func);
  }

  clear() {
    this._list = [];
    this._map.clear();
    this.markDirty();
    return this;
  }

  shuffle() {
    for (let i = this._list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this._list[i];
      this._list[i] = this._list[j];
      this._list[j] = temp;
      this._map.set(this._list[j].id, j);
      this._map.set(this._list[i].id, i);
    }
    this.markDirty();
    return this;
  }

  splice(index, num, insert = null) {
    const cards = insert ? this._list.splice(index, num, insert) : this._list.splice(index, num);
    cards.forEach(card => this._map.delete(card.id));
    for (let i = index; i < this._list.length; i++) {
      this._map.set(this._list[i], i);
    }
    this.markDirty();
    return new Pile(cards, new Map(cards.map((card, i) => [card.id, i])));
  }

  spliceLast(num) {
    return this.splice(this._list.length - num, num);
  }

  spliceFirst(num) {
    return this.splice(0, num);
  }

  every(func) {
    return this._list.every(func);
  }

  * [Symbol.iterator]() {
    yield* this._list;
  }
}
