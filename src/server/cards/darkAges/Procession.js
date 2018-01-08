import Card from 'cards/Card';

export default class Procession extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Action'),
      message: 'Choose an Action card to play twice'
    });
    if (card) {
      await player.play(card);
      player.cardsPlayedThisTurn.push(card);
      await card.onPlay(player);
      if (player.playArea.includes(card)) await player.trash(card, player.playArea);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
            player.costsEqualTo(s.cards.last(), { coin: card.cost.coin + 1 })
        ),
        message: 'Choose an card to gain'
      });
      if (supply) player.gain(supply.title);
    }
  }
}
