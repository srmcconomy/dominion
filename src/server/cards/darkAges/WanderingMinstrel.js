import Card from 'cards/Card';

export default class WanderingMinstrel extends Card {
  static cost = new Card.Cost({ coin: 4 });
    static types = new Set(['Action']);
    async onPlay(player) {
      await player.draw(1);
      player.actions += 2;
      const cards = await player.draw(3, false);
      player.game.log(`${player.name} reveals ${cards.map(c => c.title).join(', ')}`);
      while (cards.some(c => c.types.has('Action'))) {
        const [card] = await player.selectCards({
          min: 1,
          max: 1,
          pile: cards.filter(c => c.types.has('Action')),
          message: 'Select a card to put on top of your deck'
        });
        player.topDeck(card, cards);
      }
      await player.discardAll([...cards]);
    }
}
