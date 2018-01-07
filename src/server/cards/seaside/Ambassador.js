import Card from 'cards/Card';

export default class Ambassador extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Reveal a card for your opponents to gain'
    });
    const cards = await player.selectCards({
      min: 0,
      max: 2,
      predicate: c => c.name === card.title,
      message: 'Select 0-2 cards to return'
    });
    for (let i = 0; i < cards.length; i++) {
      await player.returnToSupply(cards[i]);
    }
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.gain(card.title);
    });
  }
}
