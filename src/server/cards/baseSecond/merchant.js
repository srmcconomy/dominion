import Card from 'cards/Card';

export default class Merchant extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.on('play', this.onPlayerPlayCard);
    player.on('cleanup', () => player.removeListener('cleanup', this.onPlayerPlayCard));
  }

  onPlayerPlayCard = (card, player) => {
    if (card.title === 'Silver') {
      player.money++;
      player.removeListener('play', this.onPlayerPlayCard);
    }
  }
}
