import Card from 'cards/Card';

export default class Apothecary extends Card {
  static cost = new Card.Cost({ coin: 2, potion: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const cards = await player.draw(4, false);
    player.game.log(`${player.name} reveals ${cards.map(c => c.name).join(', ')}`);
    cards.filter(c => (c.title === 'Copper' || c.title === 'Potion'))
      .forEach(c => player.moveCard(c, cards, player.hand));
    while (cards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cards,
        message: 'Select a card to put on top of your deck'
      });
      player.moveCard(card, cards, player.deck);
    }
  }
}
