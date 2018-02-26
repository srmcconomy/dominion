import Card from 'cards/Card';

export default class Mill extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static VP = 1;
  static types = new Set(['Action', 'Victory']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const choice = await player.selectOption(['Discard 2 cards', "Don't"]);
    if (choice === 0) {
      const cards = await player.selectCards({
        min: 2,
        max: 2,
        message: 'Select 2 cards to discard'
      });
      if (cards.length === 2) {
        player.money += 2;
      }
      await player.discardAll([...cards]);
    }
  }
}
