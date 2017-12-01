import { Record, Set } from 'immutable';
import Model from 'models/Model';

const Input = new Record({
  message: null,
  selectCards: null,
  selectOption: null,
  selectSupplies: null,
});

export default function (state = new Input(), action) {
  switch (action.type) {
    case 'select-cards':
      return state.set('selectCards', {
        cards: new Set(action.cards.map(id => Model.fromID(id))),
        min: action.min,
        max: action.max,
        from: action.from
      });
    case 'select-supplies':
      return state.set('selectSupplies', {
        supplies: new Set(action.supplies),
        min: action.min,
        max: action.max,
      });
    case 'select-option':
      return state.set('selectOption', {
        choices: action.choices,
      });
    case 'message':
      return state.set('message', action.message);
    case 'clear-input':
      return new Input();
    default:
      return state;
  }
}
