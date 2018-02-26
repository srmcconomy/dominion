import Card from 'cards/Card';

export default class Ironmonger extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;

    const [card] = await player.lookAtTopOfDeck(1);

    if (card) {
      player.game.log(`${player.name} reveals ${card.title}`);
      const choice = await player.selectOption([`Discard ${card.title}`, 'Don\'t']);
      if (choice === 0) await player.discard(card, player.deck);
      if (card.types.has('Action')) player.actions++;
      if (card.types.has('Treasure')) player.money++;
      if (card.types.has('Victory')) await player.draw(1);
    } else player.game.log(`${player.name} reveals nothing`);
  }
}
