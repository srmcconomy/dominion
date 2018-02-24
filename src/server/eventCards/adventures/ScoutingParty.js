import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class ScoutingParty extends EventCard {
  cost = new Card.Cost({ coin: 2 });
  async onEventBuy(player) {
    player.buys++;
    const cards = player.lookAtTopOfDeck(5);
    const cardsToDiscard = await player.selectCards({
      min: 3,
      max: 3,
      pile: cards,
      message: 'Choose 3 cards to discard',
    });
    await player.discardAll(cardsToDiscard, player.deck);
    let remainingCards = cards.filter(c => !cardsToDiscard.includes(c));
    while (remainingCards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: remainingCards,
        message: 'Select Card to put on top of deck'
      });
      player.topDeck(card, player.deck);
      remainingCards = remainingCards.filter(c => c !== card);
    }
  }
}
