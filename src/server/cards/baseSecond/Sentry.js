import Card from 'cards/Card';

export default class Sentry extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;

    const cards = await player.draw(2, false);

    while (cards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: cards,
        message: 'Select a card to move'
      });
      const choice = await player.selectOption([`Trash ${card.title}`, `Discard ${card.title}`, `Put ${card.title} back on your deck`]);
      switch (choice) {
        case 0:
          await player.trash(card, cards);
          break;
        case 1:
          await player.discard(card, cards);
          break;
        case 2:
          await player.topDeck(card, cards);
          break;
        default:
          break;
      }
    }
  }
}
