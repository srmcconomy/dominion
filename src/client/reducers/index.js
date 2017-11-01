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
  let { game, input } = state;
  switch (action.type) {
    case 'dirty': {
      const dirty = new Game(action.dirty);
      game = game.mergeWith(merger, dirty);
      return { game, input };
    }
    case 'select-cards': {
      const cards = action.cards && new Set(action.cards);
      return { game, input: { cards, min: action.min, max: action.max } };
    }
    case 'select-supplies': {
      const supplies = action.supplies && new Set(action.supplies);
      return { game, input: { supplies, min: action.min, max: action.max } };
    }
    case 'clear-input': {
      return { game, input: null };
    }
    default:
      return state;
  }
}
