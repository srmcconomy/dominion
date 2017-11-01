import { Record } from 'immutable';

import { cardTransform } from './transforms';

const transforms = {
  discardPile: cardTransform,
};

export default class Player extends new Record({
  id: null,
  name: null,
  hand: null,
  deck: null,
  discardPile: null,
}) {
  constructor(json) {
    const ret = {};
    Object.keys(json).forEach(key => {
      ret[key] = transforms[key] ? transforms[key](json[key]) : json[key];
    });
    super(ret);
  }
}
