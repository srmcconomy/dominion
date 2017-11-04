import { Record, Map } from 'immutable';

import Supply from 'models/Supply';
import Player from 'models/Player';
import { cardListTransform, newCardListTransform } from './transforms';

const transforms = {
  cards: newCardListTransform,
  hand: cardListTransform,
  trash: cardListTransform,
  playArea: cardListTransform,
  supplies: obj => new Map(Object.keys(obj).map(key => [key, new Supply(obj[key])])),
  players: obj => new Map(Object.keys(obj).map(id => [id, new Player(obj[id])])),
};

export default class Game extends new Record({
  id: null,
  name: null,
  cards: null,
  hand: null,
  trash: null,
  players: null,
  supplies: null,
  organizedSupplies: null,
  playArea: null,
  yourID: null,
  currentPlayer: null,
}) {
  constructor(json) {
    if (!json) {
      super();
    } else {
      const ret = {};
      if (json.cards) {
        ret.cards = transforms.cards(json.cards);
        delete ret.cards;
      }
      Object.keys(json).forEach(key => {
        ret[key] = transforms[key] ? transforms[key](json[key]) : json[key];
      });
      super(ret);
    }
  }
}
