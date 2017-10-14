import { Map, OrderedMap, List } from 'immutable';

export default class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  emit(type, ...args) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(listener => listener(...args));
    }
  }

  on(type, func) {
    if (!this.listeners.has(type)) {
      this.listeners = this.listeners.set(type, new List());
    }
    this.listeners = this.listeners.update(type, list => list.push(func));
  }

  addListener(type, func) {
    this.on(type, func);
  }

  removeAllListeners(type) {
    if (type) {
      this.listeners = this.listeners.delete(type);
    } else {
      this.listeners = this.listeners.clear();
    }
  }

  prependListener(type, func) {
    if (!this.listeners.has(type)) {
      this.listeners = this.listeners.set(type, new List());
    }
    this.listeners = this.listeners.update(type, list => list.unshift(func));
  }

  prependOnceListener(type, func) {
    if (!this.listeners.has(type)) {
      this.listeners = this.listeners.set(type, new List());
    }
    this.listeners = this.listeners.update(type, list => list.unshift((...args) => {
      func(...args);
      this.removeListener(func);
    }));
  }

  once(type, func) {
    if (!this.listeners.has(type)) {
      this.listeners = this.listeners.set(type, new List());
    }
    this.listeners = this.listeners.update(type, list => list.push((...args) => {
      func(...args);
      this.removeListener(func);
    }));
  }

  removeListener(type, func) {
    if (this.listeners.has(type)) {
      this.listeners = this.listeners.update(type, list => list.filter(f => f !== func));
    }
  }
}
