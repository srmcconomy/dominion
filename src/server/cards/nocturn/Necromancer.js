import Card from 'cards/Card';

export default class Necromancer extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      pile: player.game.trash.filter(c =>
        ((c.flippedTurn >= 0 ? c.flippedTurn !== player.game.turnId : true) &&
      c.types.has('Action') &&
      !c.types.has('Duration'))),
      message: 'Select a non-Duration Card to play',
    });
    if (card) {
      card.flippedTurn = player.game.turnId;
      await player.play(card);
    }
  }
}
