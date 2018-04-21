import Card from 'cards/Card';

export default class Madman extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.actions += 2;
    if (player.playArea.includes(this)) {
      player.returnToSupply(this, player.playArea);
      await player.draw(player.hand.length);
    }
  }
}
