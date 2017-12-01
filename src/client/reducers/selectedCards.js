import { List } from 'immutable';

export default function (state = new List(), action) {
  switch (action.type) {
    case 'selected-cards':
      return action.cards;
    default:
      return state;
  }
}
