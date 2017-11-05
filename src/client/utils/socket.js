import io from 'socket.io-client';
import cookies from 'js-cookie';

const socket = io();

let lastID = null;

socket.setStore = store => {
  let token = cookies.get('token');
  if (token) socket.emit('token-request', token);
  socket.on('create-game-success', t => {
    console.log(`create game success, token: ${t}`);
    token = t;
    cookies.set('token', t);
  });
  socket.on('state', s => {
    store.dispatch({ type: 'dirty', dirty: s });
  });

  socket.on('dirty', dirty => {
    store.dispatch({ type: 'dirty', dirty });
  });
  socket.on('err', err => console.error(err));

  socket.on('get-input', data => {
    lastID = data.id;
    store.dispatch({ type: 'dirty', dirty: data.dirty });
    store.dispatch({ type: 'clear-input' });
    const { payload } = data;
    if (payload.selectCards) {
      store.dispatch({ type: 'select-cards', ...data.payload.selectCards });
    }
    if (payload.selectSupplies) {
      store.dispatch({ type: 'select-supplies', ...data.payload.selectSupplies });
    }
    if (payload.selectOption) {
      store.dispatch({ type: 'select-option', ...data.payload.selectOption });
    }
  });
};

socket.respond = (type, data) => {
  if (lastID) {
    socket.emit(lastID, { type, data });
  }
};

export default socket;
