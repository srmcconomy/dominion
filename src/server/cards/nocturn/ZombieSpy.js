import Card from 'cards/Card';

export default class ZombieSpy extends Card {
  name = 'Zombie Spy';
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Zombie']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = await player.lookAtTopOfDeck(1);
    if (card) {
      if (await player.pickCard(card, player.deck, 'Discard from deck?')) {
        await player.discard(card, player.deck);
      }
    }
  }
}
