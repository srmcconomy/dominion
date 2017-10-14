export default function (game) {
  game.players.forEach(player => {
    player.on('after-draw', cards => {
      player.socket.emit('dispatch', { type: 'move-cards', player: player.id, cards: cards.map(card => card.id), from: 'deck', to: 'hand' });
      player.socket.to(game.id).emit('dispatch', { type: 'move-cards', player: player.id, cards: cards.map(() => null), from: 'deck', to: 'hand' });
    });
    player.on('after-trash', card => {
      io.to(game.id).emit('dispatch', { type: 'move-card', player: player.id, card: card.id, from: 'hand', to: 'trash' });
    });
    player.on('after-discard', card => {
      player.socket.emit('dispatch', { type: 'move-card', player: player.id, card: card.id, from: 'hand', to: 'discard' });
      player.socket.to(game.id).emit('dispatch', { type: 'move-card', player: player.id, card: null, from: 'hand', to: 'discard' });
    });
  });
}
