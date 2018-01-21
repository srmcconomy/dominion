import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Quest extends EventCard {
  cost = new Card.Cost({ coin: 0 });
  async onEventBuy(player) {
    const options = [
      {
        name: 'Discard an Attack',
        available: () => player.hand.some(c => c.types.has('Attack')),
        effect: async () => {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            predicate: c => c.types.has('Attack'),
            message: 'Choose an Attack to discard',
          });
          if (card) {
            await player.discard(card);
            return true;
          }
          return false;
        }
      },
      {
        name: 'Discard two Curses',
        available: () => player.hand.filter(c => c.types.has('Curse').length >= 2),
        effect: async () => {
          const cards = await player.selectCards({
            min: 2,
            max: 2,
            predicate: c => c.types.has('Curse'),
            message: 'Choose two Curses to discard',
          });
          if (cards.length === 2) {
            await player.discardAll(cards);
            return true;
          }
          return false;
        }
      },
      {
        name: 'Discard six cards',
        available: () => player.hand.length >= 6,
        effect: async () => {
          const cards = await player.selectCards({
            min: 6,
            max: 6,
            message: 'Choose six cards to discard',
          });
          if (cards.length === 6) {
            await player.discardAll(cards);
            return true;
          }
          return false;
        }
      },
    ];
    const choice = await player.selectOption([
      ...options.filter(o => o.available()).map(o => o.name),
      'Do Nothing',
    ]);
    if (choice === 3) return;
    if (await options[choice].effect()) {
      await player.gain('Gold');
    }
  }
}
