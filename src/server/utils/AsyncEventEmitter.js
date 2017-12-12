export default class EventEmitter {
  listeners = new Map();
  onceCallbacks = new Map();

  on(type, func) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(func);
  }

  addListener(type, func) {
    this.on(type, func);
  }

  once(type, func) {
    if (!this.onceCallbacks.has(type)) {
      this.onceCallbacks.set(type, []);
    }
    this.onceCallbacks.get(type).push(() => this.removeListener(type, func));
    this.on(type, func);
  }

  listeners(type) {
    return this.listeners.has(type) ? this.listeners.get(type).slice : [];
  }

  listenerCount(type) {
    return this.listeners.has(type) ? this.listeners.get(type).length : 0;
  }

  eventNames() {
    return [...this.listeners.keys()];
  }

  prependListener(type, func) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).unshift(func);
  }

  prependOnceListener(type, func) {
    if (!this.onceCallbacks.has(type)) {
      this.onceCallbacks.set(type, []);
    }
    this.onceCallbacks.get(type).push(() => this.removeListener(type, func));
    this.prependListener(type, func);
  }

  async emit(type, ...args) {
    if (this.listeners.has(type)) {
      const listeners = this.listeners.get(type).slice();
      if (this.onceCallbacks.has(type)) {
        this.onceCallbacks.get(type).forEach(cb => cb());
      }
      await Promise.all(listeners.map(func => func(...args)));
    }
  }

  removeListener(type, func) {
    if (this.listeners.has(type)) {
      const listeners = this.listeners.get(type);
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === func) {
          listeners.splice(i, 1);
        }
      }
    }
  }

  removeAllListeners(type) {
    if (type) {
      this.listeners.set(type, []);
    } else {
      this.listeners = new Map();
    }
  }
}
