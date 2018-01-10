import Card from 'cards/Card';

export default class StoryTeller extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action');
  async onPlay(player) {
    player.actions++;
    player.money++;
    const cards = await player.selectCards({
      min: 0,
      max: 3,
      predicate: c => c.types.has('Treasure'),
      message: 'Choose up to three treasures to play',
    });
    for (const card of cards) {
      await player.play(card);
    }
    const coinPayed = player.money;
    player.money = 0;
    await player.draw(coinPayed);
  }
}
