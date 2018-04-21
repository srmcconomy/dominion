import Card from 'cards/Card';

export default class Counterfeit extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Treasure']);
  async onPlay(player) {
    player.buys++;
    player.money++;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Treasure'),
      message: 'Choose an Treasure card to play twice'
    });
    if (card) {
      await player.play(card);
      player.cardsPlayedThisTurn.push(card);
      await card.onPlay(player);
      if (player.playArea.includes(card)) await player.trash(card, player.playArea);
    }
  }
}
