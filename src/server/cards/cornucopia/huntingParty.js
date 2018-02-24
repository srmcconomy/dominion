import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class HuntingParty extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.game.log(`${player.name} reveals ${player.hand.map(c => c.title).join(', ')}`);
    const uniqueNames = [];
    player.hand.forEach(c => {
      if (!uniqueNames.includes(c.title)) uniqueNames.push(c.title);
    });    
    const aside = new Pile();
    while (player.deck.size + player.discardPile.size > 0) {
      const [card] = await player.draw(1, false);
      player.game.log(`${player.name} reveals ${card.title}`);
      if (!uniqueNames.includes(card.title)) {
        player.hand.push(card);
        break;
      } else {
        aside.push(card);
      }
    }
    await aside.asyncForEach(card => player.discard(card));
  }
}
