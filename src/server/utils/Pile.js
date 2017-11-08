import DirtyModel from 'utils/DirtyModel';

@DirtyModel
export default class Pile {
  constructor(list = [], map = new Map()) {
    this.list = list;
    this.map = map;
  }

  createDirty() {
    return this.list.map(card => card.id);
  }

  toIDArray() {
    return [...this].map(card => card.id);
  }

  push(...cards) {
    cards.forEach((card, index) => this.map.set(card.id, this.list.length + index));
    this.list.push(...cards);
    this.markDirty();
    return this;
  }

  unshift(...cards) {
    this.list.unshift(...cards);
    this.list.forEach((card, i) => this.map.set(card.id, i));
    this.markDirty();
    return this;
  }

  set(index, card) {
    if (this.list.length >= index) {
      return this;
    }
    const oldCard = this.list.get(index);
    this.list[index] = card;
    this.map.delete(oldCard.id);
    this.map.set(card.id, index);
    this.markDirty();
    return this;
  }

  delete(card) {
    if (!this.map.has(card.id)) {
      return this;
    }
    const index = this.map.get(card.id);
    this.list.splice(index, 1);
    this.map.delete(card.id);
    for (let i = index; i < this.list.length; i++) {
      this.map.set(this.list[i].id, i);
    }
    this.markDirty();
    return this;
  }

  forEach(func) {
    this.list.forEach(func);
  }

  async asyncForEach(func) {
    for (let i = 0; i < this.list.length; i++) {
      await func(this.list[i]);
    }
  }

  shift() {
    const card = this.list.shift();
    this.map.delete(card.id);
    this.list.forEach((c, i) => this.map.set(c.id, i));
    this.markDirty();
    return card;
  }

  filter(func) {
    const pile = new Pile();
    pile.push(...this.list.filter(func));
    return pile;
  }

  some(func) {
    return this.list.some(func);
  }

  pop() {
    const card = this.list.pop();
    this.map.delete(card.id);
    this.markDirty();
    return card;
  }

  get(index) {
    return this.list[index];
  }

  has(index) {
    return this.list.length < index && index >= 0;
  }

  hasID(id) {
    return this.map.has(id);
  }

  includes(card) {
    if (typeof card === 'string') return this.map.has(card);
    return this.map.has(card.id);
  }

  get size() {
    return this.list.length;
  }

  get length() {
    return this.list.length;
  }

  last() {
    if (this.list.length === 0) return null;
    return this.list[this.list.length - 1];
  }

  map(func) {
    return this.list.map(func);
  }

  clear() {
    this.list = [];
    this.map.clear();
    this.markDirty();
    return this;
  }

  shuffle() {
    for (let i = this.list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.list[i];
      this.list[i] = this.list[j];
      this.list[j] = temp;
      this.map.set(this.list[j].id, j);
      this.map.set(this.list[i].id, i);
    }
    this.markDirty();
    return this;
  }

  splice(index, num) {
    const cards = this.list.splice(index, num);
    cards.forEach(card => this.map.delete(card.id));
    for (let i = index; i < this.list.length; i++) {
      this.map.set(this.list[i], i);
    }
    this.markDirty();
    return new Pile(cards, new Map(cards.map((card, i) => [card.id, i])));
  }

  spliceLast(num) {
    return this.splice(this.list.length - num, num);
  }

  spliceFirst(num) {
    return this.splice(0, num);
  }

  every(func) {
    return this.list.every(func);
  }

  * [Symbol.iterator]() {
    yield* this.list;
  }
}
