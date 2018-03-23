import Card from 'cards/Card';

export default class Navigator extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    const cards = await player.draw(5, false);
    const cardsStr = cards.map(c => c.name).join(', ');

    const choice = await player.selectOption(['Keep on top', 'Discard all five'], cardsStr);
    switch (choice) {
      case 0:
      {
        while (cards.size > 1) {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            pile: cards,
            message: 'Select Card to put on top of deck'
          });
          player.topDeck(card, cards);
        }
        player.topDeck(cards.last(), cards);
        break;
      }
      case 1:
        await player.discardAll([...cards], cards);
        break;
      default:
        break;
    }
  }
}
