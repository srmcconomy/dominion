import Card from 'cards/Card';

export default class StoryTeller extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    player.money++;
    for (let i = 0; i < 3; i++) {
      const [card] = await player.selectCards({
        min: 0,
        max: 1,
        predicate: c => c.types.has('Treasure'),
        message: 'Choose up to three treasures to play',
      });
      if (!card) break;
      await player.play(card);
    }
    const coinPayed = player.money;
    player.money = 0;
    await player.draw(coinPayed);
  }
}
