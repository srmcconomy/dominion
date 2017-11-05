import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'cards/basic';
import 'cards/base/Chapel';
import socket from 'utils/socket';
import { setStore as setInputStore } from 'utils/input';
import reducers from 'reducers';
import App from './components/App';


const store = createStore(reducers);
socket.setStore(store);
setInputStore(store);

const createGame = () => {
  socket.emit('create-game', 'game1', 'player1');
};

const tokenRequest = () => {
  socket.emit('token-request');
};

const joinGame = () => {
  socket.emit('join-game', 'player2');
};

const startGame = () => {
  socket.emit('start-game');
};

const render = (C) => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <C />
        <button onClick={createGame}>create game</button>
        <button onClick={tokenRequest}>token</button>
        <button onClick={joinGame}>join</button>
        <button onClick={startGame}>start</button>
      </div>
    </Provider>,
    document.getElementById('react-root'),
  );
};
render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App); });
}
