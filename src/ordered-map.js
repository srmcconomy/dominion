import { Map, List } from 'immutable';

export default class OrderedMap {
  constructor(list = new List(), map = new Map()) {
    const arr = list;
    if (Array.isArray(list)) {
      list = new List(arr);
      map = new Map(list.map((item, index) => [item.key, { index, value: item.value }]));
    }
    this.list = list;
    this.map = map;
  }

  push(key, value) {
    return new OrderedMap(this.list.push({ key, value }), this.map.set(key, { index: this.list.size, value }));
  }

  set(key, value) {
    if (!this.map.has(key)) {
      return this;
    }
    const { index } = this.map.get(key);
    return new OrderedMap(this.list, this.map.set(key, { index, value }));
  }

  delete(key) {
    if (this.map.has(key)) {
      const { index } = this.map.get(key);
      return new OrderedMap(this.list.delete(index), this.map.delete(key).map(val => {
        if (val.index > index) return { value: val.value, index: val.index - 1 };
        return val;
      }));
    }
    if (this.list.has(key)) {
      const k = this.list.get(key).key;
      return new OrderedMap(this.list.delete(key), this.map.delete(k).map(val => {
        if (val.index > key) return { value: val.value, index: val.index - 1 };
        return val;
      }));
    }
    return this;
  }

  unshift(key, value) {
    return new OrderedMap(this.list.unshift({ key, value }), this.map.set(key, { index: this.list.size, value }));
  }

  forEach(func) {
    return this.list.forEach((item, ...rest) => func(item.value, ...rest));
  }

  shift() {
    const { key } = this.list.first();
    return new OrderedMap(this.list.shift(), this.map.delete(key));
  }

  pop() {
    const { key } = this.list.last();
    return new OrderedMap(this.list.pop(), this.map.delete(key));
  }

  get(key) {
    if (this.map.has(key)) {
      return this.map.get(key);
    }
    return this.list.get(key);
  }

  has(key) {
    return this.map.has(key);
  }

  includes(value) {
    return this.list.some(item => item.value === value);
  }

  get size() {
    return this.list.size;
  }

  last() {
    return this.list.last().value;
  }

  take(num) {
    return new OrderedMap(this.list.take(num), this.map.filter(item => item.index < num));
  }

  takeLast(num) {
    return new OrderedMap(this.list.takeLast(num), this.map.filter(item => item.index >= this.list.size - num))
  }

  map(func) {
    this.list.map((item, ...rest) => func(item.value, ...rest));
  }

  toMap() {
    return this.map.map(item => item.value);
  }

  toList() {
    return this.list.map(item => item.value);
  }

  clear() {
    return new OrderedMap(this.list.clear(), this.map.clear());
  }

  shuffle() {
    let list = this.list;
    let map = this.map;
    for (let i = this.size - 1; i > 0; i--) {
      const j = Math.random() * i | 0;
      const temp = list.get(i);
      list = list.set(i, list.get(j)).set(j, temp);
      map = map
        .set(list.get(j).key, { index: j, value: list.get(j).value })
        .set(list.get(i).key, { index: i, value: list.get(i).value });
    }
    return new OrderedMap(list, map);
  }
}
