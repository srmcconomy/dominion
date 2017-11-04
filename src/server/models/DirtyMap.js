import DirtyModel from 'models/DirtyModel';

export default class DirtyMap extends DirtyModel {
  constructor(...args) {
    super(...args);
    const map = new Map();
    return new Proxy(this, {
      get(target, prop) {
        if (prop === 'set') {
          return (key, val) => {
            target._dirty.add(key);
            if (target._dirtyListeners.has(key)) {
              target._dirtyListeners.get(key)();
            }
            if (val instanceof DirtyModel) {
              target._dirtyListeners.set(key, val._onDirty(() => { target._dirty[key] = true; }));
            }
            target._emitDirty();
            map.set(key, val);
          };
        }
        if (prop === 'createDirty') {
          return all => {
            const ret = {};
            const keys = all ? map.keys() : target._dirty;
            keys.forEach(key => {
              ret[key] = map.get(key) instanceof DirtyModel ? map.get(key).createDirty(all) : map.get(key);
            });
            return ret;
          };
        }
        if (map[prop]) return map[prop];
        return target[prop];
      }
    });
  }
}
