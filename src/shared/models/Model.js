import shortid from 'shortid';

export default class Model {
  constructor(id) {
    this.id = id || shortid.generate();
    Model._models.set(this.id, this);
  }

  static _models = new Map();

  static idExists(id) {
    return Model._models.has(id);
  }

  static fromID(id) {
    return Model._models.get(id);
  }
}
