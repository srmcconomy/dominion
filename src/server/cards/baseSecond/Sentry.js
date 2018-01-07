import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Sentry extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;

    const cards = await player.lookAtTopOfDeck(2);
    const cardsToPutBack = new Pile();
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const choice = await player.selectOption([`Trash ${card.title}`, `Discard ${card.title}`, `Put ${card.title} back on your deck`]);
      switch (choice) {
        case 0:
          await player.trash(card, player.deck);
          break;
        case 1:
          await player.discard(card, player.deck);
          break;
        case 2:
          cardsToPutBack.push(card);
          break;
        default:
          break;
      }
    }
    if (cardsToPutBack.size === 2) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cardsToPutBack,
        message: 'Choose the card to put on your deck last',
      });
      if (card && card !== player.deck.last()) {
        player.topDeck(card, player.deck);
      }
    }
  }
}
