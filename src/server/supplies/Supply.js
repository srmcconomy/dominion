import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import Pile from 'utils/Pile';

@DirtyModel
class Tokens {
  @trackDirty
  embargo = 0;
}

@DirtyModel
export default class Supply {
  @trackDirty
  tokens = new Tokens();

  @trackDirty
  cards = new Pile();

  @trackDirty
  selectorCard = new Pile();

  static category;
  static types;
  static cost;
  static title;

  @trackDirty
  title;

  constructor() {
    this.title = this.constructor.title;
  }

  get cost() {
    return this.constructor.cost;
  }

  get types() {
    return this.constructor.types;
  }

  get category() {
    return this.constructor.category;
  }

  static getDependencies(kingdomArray, game) {
    return [];
  }

  setup(game) {

  }

  static classes = new Map();
}
