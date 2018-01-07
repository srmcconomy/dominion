import Card from 'cards/Card';

export default class PearlDiver extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.lookAtTopOfDeck(1);
    const card = player.deck.first();
    if (card) {
      const choice = await player.selectOption([`Put ${card.title} on top of your deck`, `Leave ${card.title} on bottom`]);
      switch (choice) {
        case 0:
          player.topDeck(card, player.deck);
          break;
        case 1:
        default:
          break;
      }
    }
  }
}
