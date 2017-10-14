import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);
const games = {};

io.on('connection', socket => {
  socket.on('join', (name, gameID) => {
    if (!games.hasOwnProperty(gameID)) {
      socket.emit('error', 'Game does not exist');
      return;
    }
    socket.join(gameID, () => {
      games[gameID].players = games[gameID].players.push(new Player(name, socket));
      socket.emit('join-success');
      socket.to(gameID).emit('join', name);
    });
  });
  socket.on('start', () => {
    Object.keys(socket.rooms).forEach(room => {
      io.to(room).emit('start');
      games[room].start();
    })
  })
});
