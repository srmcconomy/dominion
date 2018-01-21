const dirtyMap = new WeakMap();
const dirtyFields = new WeakMap();
const dirtyModels = new WeakSet();
const storedFields = new WeakMap();
const dirtyHandlers = new WeakMap();
const dirtyListeners = new WeakMap();
const serializers = new WeakMap();
const initialized = new WeakMap();
const needsInit = new WeakMap();

function isDirtyModel(obj) {
  let { constructor } = obj;
  while (constructor.prototype) {
    if (dirtyModels.has(constructor)) {
      return true;
    }
    constructor = Object.getPrototypeOf(constructor);
  }
  return false;
}

function onDirty(obj, func) {
  if (!dirtyHandlers.has(obj)) {
    dirtyHandlers.set(obj, new Set());
  }
  dirtyHandlers.get(obj).add(func);
  return () => dirtyHandlers.has(obj) && dirtyHandlers.get(obj).delete(func);
}

function emitDirty(obj) {
  if (dirtyHandlers.has(obj)) dirtyHandlers.get(obj).forEach(handler => handler());
}


export default function DirtyModel(klass) {
  dirtyModels.add(klass);
  if (!klass.prototype.createDirty) {
    klass.prototype.createDirty = function createDirty(viewer, all = false) {
      if (!dirtyModels.has(klass)) {
        return null;
      }
      if (!all && !dirtyMap.has(this)) {
        if (needsInit.has(klass.prototype)) {
          dirtyMap.set(this, new Set());
          if (!initialized.has(this)) {
            needsInit.get(klass.prototype).forEach(prop => dirtyMap.get(this).add(prop));
          } else {
            needsInit.get(klass.prototype).forEach(prop => {
              if (!initialized.get(this).has(prop)) {
                dirtyMap.get(this).add(prop);
              }
            });
          }
        } else {
          return {};
        }
        if (dirtyMap.get(this).size === 0) return {};
      }
      let forEach;
      if (!all) {
        forEach = func => dirtyMap.get(this).forEach((v, key) => func(key));
      } else if (this instanceof DirtyMap) {
        forEach = func => this.forEach((v, key) => func(key));
      } else {
        forEach = func => dirtyFields.get(klass.prototype).forEach(func);
      }
      const ret = Object.create(null);
      forEach(prop => {
        const val = this instanceof DirtyMap ? this.get(prop) : this[prop];
        if (serializers.has(klass.prototype) && serializers.get(klass.prototype).has(prop)) {
          ret[prop] = serializers.get(klass.prototype).get(prop)(viewer, this)(val);
        } else {
          ret[prop] = val && val.createDirty ? val.createDirty(viewer, all) : val;
        }
      });
      return ret;
    };
  }

  klass.prototype.clean = function clean() {
    dirtyMap.delete(this);
    if (this instanceof DirtyMap) {
      this.forEach(val => val && val.clean && val.clean());
    } else if (dirtyFields.has(klass.prototype)) {
      dirtyFields.get(klass.prototype).forEach(prop => this[prop] && this[prop].clean && this[prop].clean());
    }
  };

  klass.prototype.markDirty = function markDirty() {
    emitDirty(this);
  };
}

@DirtyModel
export class DirtyMap extends Map {
  set(key, value) {
    if (!dirtyMap.has(this)) {
      dirtyMap.set(this, new Set());
    }
    if (value && isDirtyModel(value)) {
      if (!dirtyListeners.has(this)) {
        dirtyListeners.set(this, new Map());
      }
      const listener = onDirty(value, () => {
        if (!dirtyMap.has(this)) {
          dirtyMap.set(this, new Set());
        }
        emitDirty(this);
        dirtyMap.get(this).add(key);
      });
      dirtyListeners.get(this).set(key, listener);
    }
    emitDirty(this);
    dirtyMap.get(this).add(key);
    super.set(key, value);
  }
}

export function trackDirty(target, key, descriptor, serializer) {
  if (!key && !descriptor) {
    return (t, k, d) => trackDirty(t, k, d, target);
  }
  if (serializer) {
    if (!serializers.has(target)) {
      serializers.set(target, new Map());
    }
    serializers.get(target).set(key, serializer);
  }
  if (!dirtyFields.has(target)) {
    dirtyFields.set(target, new Set());
  }
  dirtyFields.get(target).add(key);

  let setter;
  if (descriptor.set) {
    setter = descriptor.set;
  } else {
    const { initializer } = descriptor;
    if (initializer) {
      if (!needsInit.has(target)) {
        needsInit.set(target, new Set());
      }
      needsInit.get(target).add(key);
    }

    descriptor.get = function get() {
      if (!storedFields.has(this)) {
        storedFields.set(this, new Map());
      }
      if (initializer && (!initialized.has(this) || !initialized.get(this).has(key))) {
        if (!initialized.has(this)) {
          initialized.set(this, new Set());
        }
        this[key] = initializer();
        initialized.get(this).add(key);
      }
      return storedFields.get(this).get(key);
    };

    setter = function set(value) {
      if (initializer && (!initialized.has(this) || !initialized.get(this).has(key))) {
        if (!initialized.has(this)) {
          initialized.set(this, new Set());
        }
        initialized.get(this).add(key);
      }
      if (!storedFields.has(this)) {
        storedFields.set(this, new Map());
      }
      storedFields.get(this).set(key, value);
    };
  }
  delete descriptor.initializer;
  delete descriptor.writable;
  return {
    ...descriptor,
    set(value) {
      if (!storedFields.has(this)) {
        storedFields.set(this, new Map());
      }
      if (!dirtyMap.has(this)) {
        dirtyMap.set(this, new Set());
      }
      if (dirtyListeners.has(this) && dirtyListeners.get(this).has(key)) {
        dirtyListeners.get(this).get(key)();
      }

      // If value is a dirtyModel
      if (value && isDirtyModel(value)) {
        if (!dirtyListeners.has(this)) {
          dirtyListeners.set(this, new Map());
        }
        const listener = onDirty(value, () => {
          if (!dirtyMap.has(this)) {
            dirtyMap.set(this, new Set());
          }
          emitDirty(this);
          dirtyMap.get(this).add(key);
        });
        dirtyListeners.get(this).set(key, listener);
      }

      emitDirty(this);
      dirtyMap.get(this).add(key);
      setter.call(this, value);
    },
  };
}
