export default class Card {
  static classes = {};
  static currentID = 0;
  static getNewID() { return Card.currentID++; }
  constructor(id) {
    if (id != null) this.id = id;
    else this.id = Card.getNewID();
  }
  get cost() {
    return this.constructor.cost;
  }
  get value() {
    return this.constructor.value;
  }
  get name() {
    return this.constructor.name;
  }
  get description() {
    return this.constructor.description;
  }
  get types() {
    return this.constructor.types;
  }
  get image() {
    return this.constructor.image;
  }
  toJS() {
    return {
      id: this.id,
      name: this.name,
    };
  }
  fromJS({ id, name }) {
    return {
      id,
      name,
      cost: Card.classes[obj.name].cost,
      value: Card.classes[obj.name].value,
      types: Card.classes[obj.name].types,
      image: Card.classes[obj.name].image,
      description: Card.classes[obj.name].description,
      vp: Card.classes[obj.name].vp,
    };
  }
  onPlay(game) { }
  onDraw(game) { }
  onDiscard(game) { }
  onTrash(game) { }
  onGain(game) { }
  onBuy(game) { }
}
