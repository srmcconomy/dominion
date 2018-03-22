import Card from 'cards/Card';

export default class Copper extends Card {
  static value = 1;
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  onPlay(player) {
    const coppersmiths = player.cardsPlayedThisTurn.filter(c => c.title === 'Coppersmith').length;
    player.money += 1 + coppersmiths;
  }
}
