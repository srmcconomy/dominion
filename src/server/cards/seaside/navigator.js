import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Navigator extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    const cards = await player.lookAtTopOfDeck(5);
    let cardsStr = '';
    for (let i = 0; i < cards.length; i++) {
      cardsStr += `${cards[i].title}, `;
    }

    const choice = await player.selectOption(['Keep on top', 'Discard all five'], cardsStr);
    switch (choice) {
      case 0:
      {
        const cardsInspected = new Pile();
        for (let i = 0; i < cards.length; i++) {
          cardsInspected.push(cards[i]);
        }
        console.log(cardsInspected);
        console.log(player.deck);
        while (cardsInspected.size > 0) {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            pile: cardsInspected,
            message: 'Select Card to put on top of deck'
          });
          player.topDeck(card, player.deck);
          cardsInspected.delete(card);
        }
        break;
      }
      case 1:
        for (let i = 0; i < cards.size; i++) {
          await player.discard(cards[i], player.deck);
        }
        break;
      default:
        break;
    }
  }
}
