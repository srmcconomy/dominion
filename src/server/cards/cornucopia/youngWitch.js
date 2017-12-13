import Card from 'cards/Card';

export default class YoungWitch extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.draw(2);
    const cards = await player.selectCards({ min: 2, max: 2, message: 'Discard two cards' });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', player, this)) {
        return;
      }
      const [card] = await other.selectCards({ min: 0, max: 1, predicate: c => c instanceof YoungWitch.bane, message: 'Choose to reveal a bane card or not' });
      if (!card) {
        await other.gain('Curse');
      }
    });
  }


  static getDependencies(kingdomArray, game) {
    const dependencies = [];
    const possibleBanes = [];
    Card.classes.forEach(c => {
      const tempCost = { coin: 0, debt: 0, potion: 0, ...c.cost };
      if (
        c.title &&
        (tempCost.coin === 2 || tempCost.coin === 3) &&
        !tempCost.debt &&
        !tempCost.potion &&
        !kingdomArray.includes(c.title) &&
        c.supplyCategory === 'kingdom'
      ) {
        possibleBanes.push(c);
      }
    });
    YoungWitch.bane = possibleBanes[Math.floor(Math.random() * possibleBanes.length)];
    game.log(`${YoungWitch.bane.title} is Young Witch's Bane`);
    dependencies.push(YoungWitch.bane.title);
    dependencies.push(...YoungWitch.bane.getDependencies(kingdomArray, game));
    return dependencies;
  }
}
