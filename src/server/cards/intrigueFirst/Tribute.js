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
    const cardNames = [];
    for (let i = 0; i < cards.length; i++) {
      if (cardNames.includes(cards[i].title)) continue;
      cardNames.push(cards[i].title);
      if (cards[i].types.has('Action')) player.actions += 2;
      if (cards[i].types.has('Treasure')) player.money += 2;
      if (cards[i].types.has('Victory')) await player.draw(2);
    }
    cards.forEach(c => leftPlayer.discard(c, leftPlayer.deck));
  }
}
