import Card from 'cards/Card';

export default class ShantyTown extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    player.gameLog(`${player.name} reveals ${player.hand.list.map(c => c.title).join(', ')}`);
    if (!player.hand.some(card => card.types.has('Action'))) {
      await player.draw(2);
    }
  }
}
