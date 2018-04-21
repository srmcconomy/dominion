import Card from 'cards/Card';

export default class Explorer extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.title === 'Province',
      message: 'You may reveal a Province to gain a Gold, else gain a silver'
    });
    if (card) {
      player.game.log(`${player.name} reveals a Province`);
      await player.gain('Gold', player.hand);
    } else {
      player.game.log(`${player.name} dosn't reveal a Province`);
      await player.gain('Silver', player.hand);
    }
  }
}
