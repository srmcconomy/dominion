import Card from 'cards/Card';

export default class DenOfSin extends Card {
  name = 'Den of Sin';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Night', 'Duration']);
  async onPlay(player) {
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return (
      (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this)) ||
      (event.name === 'would-gain' && event.card === this && event.triggeringPlayer === player)
    );
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'start-of-turn':
        await player.draw(2);
        this.ignoreCleanUp = false;
        break;
      case 'would-gain':
        event.destination = player.hand;
        break;
    }
  }
}
