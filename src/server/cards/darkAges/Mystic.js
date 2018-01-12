import Card from 'cards/Card';

export default class Mystic extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    player.money += 2;
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: () => true,
      message: 'Name a card',
    });
    player.game.log(`${player.name} names ${supply.title}`);
    const [card] = await player.lookAtTopOfDeck(1);
    player.game.log(`${player.name} reveals ${card.title}`);
    if (card && card.title === supply.title) {
      await player.draw(1);
    }
  }
}
