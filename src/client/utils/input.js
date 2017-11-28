import { Set } from 'immutable';
import socket from 'utils/socket';

let cardResponse = new Set();
let store = null;

export function setStore(s) {
  store = s;
}

export function doneChoosingCards() {
  console.log(cardResponse);
  socket.respond('select-cards', cardResponse.map(card => card.id));
  cardResponse = cardResponse.clear();
  store.dispatch({ type: 'selected-cards', cards: cardResponse });
}

export function toggleCardInResponse(card) {
  const state = store.getState();
  if (!state.input || !state.input.selectCards || !state.input.selectCards.cards.has(card)) {
    return;
  }
  if (cardResponse.has(card)) {
    cardResponse = cardResponse.delete(card);
  } else if (state.input.selectCards.max > cardResponse.size) {
    cardResponse = cardResponse.add(card);
  } else {
    return;
  }
  store.dispatch({ type: 'selected-cards', cards: cardResponse });
  if (store.getState().input.selectCards.max === 1) {
    doneChoosingCards();
  }
}

export function chooseOption(index) {
  socket.respond('select-option', index);
}

export function chooseSupply(supply) {
  const state = store.getState();
  if (!state.input || !state.input.selectSupplies || !state.input.selectSupplies.supplies.has(supply.title)) {
    return;
  }
  socket.respond('select-supply', [supply.title]);
}
