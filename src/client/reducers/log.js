import { List } from 'immutable';

export default function (state = new List(), action) {
  switch (action.type) {
    case 'log':
      return state.push(...action.log);
    default:
      return state;
  }
}
