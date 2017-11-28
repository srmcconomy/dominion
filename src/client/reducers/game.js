import Game from 'models/Game';
import Player from 'models/Player';
import Supply from 'models/Supply';
import { Map } from 'immutable';

function merger(a, b) {
  if ((a instanceof Map && b instanceof Map) || (a instanceof Player && b instanceof Player) || (a instanceof Supply && b instanceof Supply)) {
    return a.mergeWith(merger, b);
  }
  return b == null ? a : b;
}

export default function (state = null, action) {
  switch (action.type) {
    case 'dirty': {
      const dirty = new Game(action.dirty);
      return state ? state.mergeWith(merger, dirty) : dirty;
    }
    default:
      return state;
  }
}
