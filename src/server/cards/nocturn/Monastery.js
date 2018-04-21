import Card from 'cards/Card';

export default class Monastery extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Night']);
  async onPlay(player) {
    for (let i = 0; i < player.cardsGainedThisTurn.length; i++) {
      const [card] = await player.selectCards({
        min: 0,
        max: 1,
        pile: [...player.hand, ...player.playArea.filter(c => c.title === 'Copper')],
        message: 'Select a Card to trash'
      });
      if (card) {
        if (player.playArea.includes(card)) {
          await player.trash(card, player.playArea);
        }
        else {
          await player.trash(card);
        }
      } else break;
    }
  }
}
