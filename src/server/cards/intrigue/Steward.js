import Card from 'cards/Card';

export default class Steward extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const choice = await player.selectOption(['+2 Cards', '+2 Coins', 'Trash 2 cards from your hand'], 'Choose one:');
    switch (choice) {
      case 0:
        await player.draw(2);
        break;
      case 1:
        player.game.log(`${player.name} chooses +$2`);
        player.money += 2;
        break;
      case 2: {
        const cards = await player.selectCards({ min: 2, max: 2, message: 'Choose two cards to trash' });
        for (let i = 0; i < cards.length; i++) {
          await player.trash(cards[i]);
        }
        break;
      }
      default:
        break;
    }
  }
}
