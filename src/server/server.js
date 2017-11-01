import 'source-map-support/register';
import 'babel-polyfill';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import shortid from 'shortid';

import Game from 'models/Game';
import Player from 'models/Player';

const app = express();
const server = http.Server(app);
const io = socketio(server);
const games = new Map();
const tokens = new Map();

process.on('unhandledRejection', error => {
  console.error(error);
});

io.on('connection', socket => {
  let player = null;
  socket.on('token-request', token => {
    if (!tokens.has(token)) {
      socket.emit('err', 'Invalid Token');
      return;
    }
    player = tokens.get(token);
    player.setSocket(socket);
  });
  socket.on('create-game', (gameName, playerName) => {
    console.log('created');
    const game = new Game(gameName, io);
    player = new Player(playerName, game, socket);
    games.set(game.id, game);
    const token = shortid.generate();
    tokens.set(token, player);
    socket.emit('create-game-success', token);
  });
  socket.on('join-game', (name, gameID) => {
    [gameID] = games.keys();
    console.log(`join game: ${gameID}`);
    if (!games.has(gameID)) {
      socket.emit('err', 'Game does not exist');
      return;
    }
    const game = games.get(gameID);
    console.log('1');
    player = new Player(name, game, socket);
    console.log('2');
    const token = shortid.generate();
    tokens[token] = player;
    socket.join(gameID, () => {
      socket.emit('join-success', token);
      socket.emit('state', player.game.getStateFor(player));
      socket.to(gameID).emit('join', name);
    });
  });
  socket.on('start-game', () => {
    player.game.start();
  });
});

const sourcePath = process.env.NODE_ENV === 'production' ?
  '/dist' :
  'http://localhost:9000/assets';

app.get('/', (req, res) => {
  res.send(
    `<html>
      <head>
        <link href="${sourcePath}/app.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
        </head>
      <body>
        <div id="react-root"></div>
        <script src="${sourcePath}/app.js"></script>
      </body>
    </html>`
  );
});

server.listen(3000);
