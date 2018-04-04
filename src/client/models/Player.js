import { Record } from 'immutable';

import { cardTransform, pileTransform } from './transforms';

const transforms = {
  discardPile: obj => (obj.top ? cardTransform(obj.top) : 0),
  hand: obj => (obj.pile ? pileTransform(obj) : obj.size),
  playArea: pileTransform,
};

export default class Player extends new Record({
  id: null,
  name: null,
  hand: null,
  deck: null,
  playArea: null,
  discardPile: null,
  buys: null,
  actions: null,
  money: null,
  debt: null,
  potion: null,
  vpTokens: null,
}) {
  constructor(json) {
    const ret = {};
    Object.keys(json).forEach(key => {
      ret[key] = transforms[key] ? transforms[key](json[key]) : json[key];
    });
    super(ret);
  }
}
