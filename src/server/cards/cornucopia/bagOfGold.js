import Card from 'cards/Card';

export default class BagOfGold extends Card {
  name = 'Bag of Gold';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Prize']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.actions++;
    await player.gain('Gold', player.deck);
  }
}
