import socket from 'utils/socket';

let cardResponse = [];
let store = null;

export function setStore(s) {
  store = s;
}

export function doneChoosingCards() {
  socket.respond('select-cards', cardResponse);
  cardResponse = [];
  store.dispatch({ type: 'selected-cards', cards: cardResponse });
}

export function addCardToResponse(card) {
  const state = store.getState();
  if (!state.input || !state.input.selectCards || !state.input.selectCards.cards.has(card.id)) {
    return;
  }
  cardResponse.push(card.id);
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
