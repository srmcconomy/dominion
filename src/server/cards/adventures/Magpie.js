import Card from 'cards/Card';

export default class Magpie extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = player.lookAtTopOfDeck(1);
    player.game.log(`${player.name} reveals ${card.title}`);
    if (card) {
      if (card.types.has('Treasure')) {
        player.moveCard(card, player.deck, player.hand);
      }
      if (card.types.has('Action') || card.types.has('Victory')) {
        await player.gain('Magpie');
      }
    }
  }
}
