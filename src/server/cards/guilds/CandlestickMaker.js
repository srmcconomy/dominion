import Card from 'cards/Card';

export default class CandlestickMaker extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    player.buys++;
    player.coinTokens++;
  }
}
