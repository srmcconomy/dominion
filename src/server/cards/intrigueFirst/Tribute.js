import Card from 'cards/Card';

export default class Tribute extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const leftPlayer = player.game.playerOrder[
      player.game.currentPlayerIndex + 1 === player.game.players.size ? 0 : player.game.currentPlayerIndex + 1
    ];
    const cards = leftPlayer.lookAtTopOfDeck(2);
    player.game.log(`${leftPlayer.name} reveals ${cards.map(c => c.title).join(', ')}`);
    if (cards[0]) {
      if (cards[0].types.has('Action')) player.actions += 2;
      if (cards[0].types.has('Treasure')) player.money += 2;
      if (cards[0].types.has('Victory')) await player.draw(2);
    }
    if (cards[1] && cards[1].title !== cards[0].title) {
      if (cards[1].types.has('Action')) player.actions += 2;
      if (cards[1].types.has('Treasure')) player.money += 2;
      if (cards[1].types.has('Victory')) await player.draw(2);
    }
    cards.forEach(c => leftPlayer.discard(c, leftPlayer.deck));
  }
}
