import { Map } from 'immutable';

import Player from 'models/Player';
import Game from 'models/Game';
import Supply from 'models/Supply';

function merger(a, b) {
  if ((a instanceof Map && b instanceof Map) || (a instanceof Player && b instanceof Player) || (a instanceof Supply && b instanceof Supply)) {
    return a.mergeWith(merger, b);
  }
  return b == null ? a : b;
}

export default function (state = { game: new Game(), input: null }, action) {
  console.log(action);
  let { game, input, cardToShow, selectedCards } = state;
  switch (action.type) {
    case 'dirty': {
      const dirty = new Game(action.dirty);
      game = game.mergeWith(merger, dirty);
      return { game, input, cardToShow, selectedCards };
    }
    case 'select-cards': {
      const cards = action.cards && new Set(action.cards);
      if (!input) {
        input = {};
      }
      input.selectCards = { cards, min: action.min, max: action.max };
      return { game, input, cardToShow, selectedCards };
    }
    case 'select-supplies': {
      const supplies = action.supplies && new Set(action.supplies);
      if (!input) {
        input = {};
      }
      input.selectSupplies = { supplies, min: action.min, max: action.max };
      return { game, input, cardToShow, selectedCards };
    }
    case 'select-option': {
      if (!input) {
        input = {};
      }
      input.selectOption = { choices: action.choices };
      return { game, input, cardToShow, selectedCards };
    }
    case 'clear-input': {
      return { game, input: null, cardToShow, selectedCards };
    }
    case 'look-at-card': {
      return { game, input, cardToShow: action.card, selectedCards };
    }
    case 'selected-cards': {
      return { game, input, cardToShow: action.card, selectedCards: action.cards };
    }
    default:
      return state;
  }
}
