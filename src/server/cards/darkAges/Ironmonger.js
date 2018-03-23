import Card from 'cards/Card';

export default class Ironmonger extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;

    const [card] = await player.lookAtTopOfDeck(1);

    if (card) {
      player.game.log(`${player.name} reveals ${card.name}`);
      if (await player.pickCard(card, player.deck, 'Discard?')) {
        await player.discard(card, player.deck);
      } else player.game.log(`${player.name} leaves card on top`);
      if (card.types.has('Action')) player.actions++;
      if (card.types.has('Treasure')) player.money++;
      if (card.types.has('Victory')) await player.draw(1);
    } else player.game.log(`${player.name} reveals nothing`);
  }
}
