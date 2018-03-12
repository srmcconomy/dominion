import Card from 'cards/Card';

export default class Vagrant extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;

    const [card] = await player.lookAtTopOfDeck(1);
    player.game.log(`${player.name} revales ${card.title}`);
    if (card) {
      if (card.types.has('Curse') || card.types.has('Ruins') || card.types.has('Shelter') || card.types.has('Victory')) {
        await player.moveCard(card, player.deck, player.hand);
      }
    }
  }
}
