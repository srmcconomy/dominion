import Card from 'cards/Card';

export default class Bureaucrat extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.gain('Silver', player.deck);
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      if (other.hand.some(card => card.types.has('Victory'))) {
        const [c] = await other.selectCards({ min: 1, max: 1, predicate: card => card.types.has('Victory'), message: 'Choose a Victory card to put onto your deck' });
        other.topDeck(c);
      } else {
        player.game.log(`${other.name} shows ${other.hand.list.map(c => c.title).join(', ')}`);
      }
    });
  }
}
