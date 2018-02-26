import Card from 'cards/Card';

export default class Harvest extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const cards = player.lookAtTopOfDeck(4);
    player.game.log(`${player.name} reveals ${cards.map(c => c.title).join(', ')}`);
    await player.discardAll([...cards], player.deck);
    const uniqueNames = [];
    cards.forEach(c => {
      if (!uniqueNames.includes(c.title)) uniqueNames.push(c.title);
    });
    player.money += uniqueNames.length;
  }
}
