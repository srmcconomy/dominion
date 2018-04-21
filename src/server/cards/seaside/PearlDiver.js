import Card from 'cards/Card';

export default class PearlDiver extends Card {
  name = 'Pearl Diver';
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.lookAtTopOfDeck(1);
    const card = player.deck.first();
    if (card) {
      if (await player.pickCard(card, player.deck, 'Put on top of your deck?')) {
        player.topDeck(card, player.deck);
      }
    }
  }
}
