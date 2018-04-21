import Card from 'cards/Card';

export default class PhilosophersStone extends Card {
  name = 'Philosopher\'s Stone'
  static cost = new Card.Cost({ coin: 3, potion: 1 });
  static types = new Set(['Treasure']);
  async onPlay(player) {
    const value = Math.floor((player.deck.length + player.discardPile.length) / 5);
    player.game.log(`Worth: ${value}. Deck count: ${player.deck.length}, Discard Pile count: ${player.discardPile.length}`);
    player.money += value;
  }
}
