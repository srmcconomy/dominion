import Card from 'cards/Card';

export default class Tribute extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const leftPlayer = player.nextPlayer();
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
    await leftPlayer.discardAll([...cards], leftPlayer.deck);
  }
}
