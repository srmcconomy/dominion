import Card from 'cards/Card';

export default class Ambassador extends Card {
  static cost = 3;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    const [card] = await player.selectCards({min:1, max:1, message:'Reveal a card for your opponents to gain'});
    console.log('card',card, card.title);
    const cards = await player.selectCards({min:0, max:2, predicate: c=> c.name === card.title, message: 'Select 0-2 cards to return'});
    for (let i = 0; i < cards.length; i++) {
      await player.returnToSupply(cards[i]);
    }
    await player.forEachOtherPlayer(async other => {
      await other.gain(card.title);
    });
  }
}
