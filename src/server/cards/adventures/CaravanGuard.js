import Card from 'cards/Card';

export default class CaravanGuard extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Reaction', 'Duration']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    this.ignoreCleanUp = true;
  }

  canTriggerOn(event, player) {
    if (event.name === 'play-first') {
      console.log(event.card.types.has('Attack'));
      console.log(event.triggeringPlayer !== player);
      console.log(player.hand.includes(this));
    }
    return event.name === 'play-first' && event.card.types.has('Attack') && event.triggeringPlayer !== player && player.hand.includes(this);
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'start-of-turn':
        this.ignoreCleanUp = false;
        player.money++;
        break;
      case 'play-first':
        await player.play(this);
        break;
    }
  }
}
