import Card from 'cards/Card';

export default class Courtyard extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
    const [card] = await player.selectCards({ min: 1, max: 1, message: 'Choose a card to put onto your deck' });
    if (card) {
      player.moveCard(card, player.hand, player.deck);
    }
  }
}

Card.classes.set('Courtyard', Courtyard);
