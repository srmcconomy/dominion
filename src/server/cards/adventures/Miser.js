import Card from 'cards/Card';

export default class Miser extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set('Action');
  async onPlay(player) {
    const numCoppers = player.mats.tavern.filter(card => card.title === 'Copper').length;
    const choice = await player.selectOption([
      'Put a copper from your hand onto the Tavern mat',
      `+${numCoppers} Coins`
    ]);
    switch (choice) {
      case 0: {
        const [copper] = await player.selectCards({
          min: 1,
          max: 1,
          predicate: card => card.title === 'Copper',
          message: 'Choose a copper to put on the Tavern mat',
        });
        player.moveCard(copper, player.hand, player.mats.tavern);
        break;
      }
      case 1:
        player.money += numCoppers;
        break;
    }
  }
}
