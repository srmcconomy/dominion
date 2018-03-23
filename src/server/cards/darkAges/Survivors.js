import Card from 'cards/Card';

export default class Survivors extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    const cards = await player.draw(2, false);
    const choice = await player.selectOption([`Discard ${cards.map(c => c.name).join(', ')}`, 'Put them back']);
    switch (choice) {
      case 0:
        await player.discardAll([...cards], cards);
        break;
      case 1:
        while (cards.length) {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            pile: cards,
            message: 'Select a card to put on top of your deck'
          });
          if (card) await player.topDeck(card, cards);
        }
        player.game.log(`${player.name} puts cards back on their deck`);
        break;
      default:
        break;
    }
  }
}
