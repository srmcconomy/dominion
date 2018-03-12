import Card from 'cards/Card';

export default class WillOWisp extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Spirit']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = player.lookAtTopOfDeck(1);
    if (await player.cardCostsLessThanEqualTo(card, { coin: 2 })) player.pickUp(card, player.deck);

  }
}
