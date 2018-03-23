import Card from 'cards/Card';

export default class NightWatchman extends Card {
  name = 'Night Watchman';
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Night']);
  async onPlay(player) {
    const topCards = await player.draw(5, false);
    const cards = await player.selectCards({
      min: 0,
      max: topCards.length,
      pile: topCards,
      message: 'Select Cards to discard'
    });
    await player.discardAll([...cards], topCards);
    while (topCards.length > 0) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: topCards,
        message: 'Choose a card to put on top of your deck'
      });
      player.topDeck(card, topCards);
    }
  }

  willTriggerOn(event, player) {
    return (
      event.name === 'would-gain' &&
    event.card === this &&
    event.triggeringPlayer === player
    );
  }

  async onTrigger(event, player) {
    event.destination = player.hand;
  }
}
