import Card from 'cards/Card';

export default class ZombieSpy extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Zombie']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = await player.lookAtTopOfDeck(1);
    if (card) {
      const choice = await player.selectOption([`Discard ${card.title}`, `Leave ${card.title} on deck`]);
      if (choice === 0) await player.discard(card, player.deck);
    }
  }
}
