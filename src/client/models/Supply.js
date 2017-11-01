import { Record } from 'immutable';

import { cardListTransform } from './transforms';

export default class Supply extends new Record({
  title: null,
  tokens: null,
  cards: null,
}) {
  constructor(json) {
    if (json.cards) {
      json.cards = cardListTransform(json.cards);
    }
    super(json);
  }
}
