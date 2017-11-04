import { nonenumerable } from 'core-decorators';

import Model from 'models/Model';

const collectionProxy = propList => (target, prop, collection) => new Proxy(collection, {
  get(t, p) {
    if (propList.includes(p)) {
      return (...args) => {
        target._dirty.add(prop);
        t[p](...args);
      };
    }
    return t[p];
  },
  set(t, p, v) {
    target._dirty.add(prop);
    t[p] = v;
    return true;
  },
});

const arrayProxy = collectionProxy(['push', 'unshift', 'pop', 'shift', 'clear', 'copyWithin', 'fill', 'reverse', 'sort', 'splice']);
const mapProxy = collectionProxy(['set', 'clear', 'delete']);
const setProxy = collectionProxy(['add', 'clear', 'delete']);

export default class DirtyModel extends Model {
  @nonenumerable
  _dirtyHandlers = new Set();

  @nonenumerable
  _dirtyListeners = new Map();

  @nonenumerable
  _dirty = new Set();

  constructor(...args) {
    super(...args);
    return new Proxy(this, {
      set(target, prop, value) {
        if (Object.prototype.propertyIsEnumerable.call(target, prop)) {
          target._dirty.add(prop);
          if (target._dirtyListeners.has(prop)) {
            target._dirtyListeners.get(prop)();
          }
          if (value instanceof DirtyModel) {
            target._dirtyListeners.set(prop, value._onDirty(() => { target._dirty[prop] = true; }));
          }
          target._emitDirty();
          if (Array.isArray(value)) {
            target[prop] = arrayProxy(target, prop, value);
            return true;
          }
          if (value instanceof Map) {
            target[prop] = mapProxy(target, prop, value);
            return true;
          }
          if (value instanceof Set) {
            target[prop] = setProxy(target, prop, value);
            return true;
          }
        }
        target[prop] = value;
        return true;
      }
    });
  }

  clean() {
    this._dirty.clear();
  }

  _onDirty(func) {
    this._dirtyHandlers.add(func);
    return () => this._dirtyHandlers.delete(func);
  }

  _emitDirty() {
    this._dirtyHandlers.forEach(func => func());
  }

  createDirty(all = false) {
    const ret = {};
    const keys = all ? Object.keys(this) : this._dirty;
    keys.forEach(prop => {
      if (this[prop] instanceof DirtyModel) {
        ret[prop] = this[prop].createDirty(all);
      } else if (this[prop] instanceof Map) {
        const m = {};
        this[prop].forEach((val, key) => {
          m[key] = val instanceof DirtyModel ? val.createDirty(all) : val;
        });
        ret[prop] = m;
      } else if (this[prop] instanceof Set || Array.isArray(this[prop])) {
        ret[prop] = this[prop].map(val => (val instanceof DirtyModel ? val.createDirty(all) : val));
      } else {
        ret[prop] = this[prop];
      }
    });
    return ret;
  }

  toJSON() {
    return this.createDirty(true);
  }
}
