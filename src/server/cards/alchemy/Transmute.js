import Card from 'cards/Card';

export default class Transmute extends Card {
  static cost = new Card.Cost({ potion: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to trash'
    });
    if (card) {
      await player.trash(card);
      if (card.types.has('Action')) await player.gain('Duchy');
      if (card.types.has('Treasure')) await player.gain('Transmute');
      if (card.types.has('Victory')) await player.gain('Gold');
    }
  }
}
