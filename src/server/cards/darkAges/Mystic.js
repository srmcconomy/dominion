import Card from 'cards/Card';

export default class Mystic extends Card {
  static cost = new Card.Cost({ coin: 5 });
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
    if (card) {
      player.game.log(`${player.name} reveals ${card.name}`);
      if (card && card.title === supply.title) {
        await player.draw(1);
      }
    }
  }
}
