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
    store.dispatch(data.payload);
  });
};

socket.respond = data => {
  if (lastID) {
    socket.emit(lastID, data);
  }
};

export default socket;
