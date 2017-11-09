import Card from 'cards/Card';

export default class Lurker extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const choice = await player.selectOption([
      'Trash an Action from the Supply',
      'Gain an Action from the trash',
    ]);
    switch (choice) {
      case 0: {
        const [supply] = await player.selectSupplies({ min: 1, max: 1, predicate: s => s.cards.size > 0 && s.cards.last().types.has('Action'), message: 'Choose an action to trash' });
        if (supply) {
          const [card] = player.moveCard(supply.cards, player.game.trash);
          if (card) {
            await card.onTrash();
          }
        }
        break;
      }
      case 1: {
        if (player.game.trash.size > 0) {
          const [card] = await player.selectCards({ min: 1, max: 1, pile: player.game.trash.filter(c => c.types.has('Action')), message: 'Choose an action to gain' });
          if (card) {
            player.moveCard(card, player.game.trash, player.discardPile);
            await card.onGain();
          }
        }
        break;
      }
      default:
        throw new Error('invalid selection');
    }
  }
}
