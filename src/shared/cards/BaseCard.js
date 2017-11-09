import Model from 'models/Model';

export default class BaseCard extends Model {
  constructor(...args) {
    super(...args);
    const proxy = new Proxy(this, {
      get(target, prop) {
        if (target[prop] !== undefined) return target[prop];
        if (target.constructor[prop] !== undefined) return target.constructor[prop];
        if (prop === 'title') return target.constructor.name;
        return undefined;
      }
    });
    Model._models.set(this.id, proxy);
    return proxy;
  }

  static from(id, name) {
    return new (BaseCard.classes.get(name))(id);
  }
  static classes = new Map();
}
