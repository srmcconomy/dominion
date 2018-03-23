import Card from 'cards/Card';

export default class Menagerie extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    player.game.log(`${player.name} reveals ${player.hand.map(c => c.name).join(', ')}`);
    const uniqueNames = [];
    player.hand.forEach(c => {
      if (!uniqueNames.includes(c.title)) uniqueNames.push(c.title);
    });
    if (player.hand.length === uniqueNames.length) {
      await player.draw(3);
    } else {
      await player.draw(1);
    }
  }
}
