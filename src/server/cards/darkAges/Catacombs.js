import Card from 'cards/Card';

export default class Catacombs extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const cards = await player.lookAtTopOfDeck(3);
    const choice = await player.selectOption([`Put ${cards.map(c => c.title).join(', ')} into your hand`, 'Discard them and draw three new cards']);
    switch (choice) {
      case 0:
        for (let i = 0; i < cards.length; i++) {
          player.moveCard(cards[i], player.deck, player.hand);
        }
        break;
      case 1:
        await player.discardAll([...cards], player.deck);
        await player.draw(3);
        break;
      default:
        break;
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    event.cards.includes(this);
  }

  async onTrigger(event, player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.cardCostsLessThan(s.cards.last(), this.cost)
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }
}
