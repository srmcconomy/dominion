import Card from 'cards/Card';

export default class HorseTraders extends Card {
  name = 'Horse Traders';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    player.buys++;
    player.money += 3;
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      message: 'Select cards to discard'
    });

    await player.discardAll([...cards]);
  }

  canTriggerOn(event, player) {
    return event.name === 'play-first' && player !== event.triggeringPlayer && event.card.types.has('Attack') && player.hand.includes(this);
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.asidePile.includes(this);
  }

  async onTrigger(event, player) {
    switch (event.name) {
      case 'play-first':
        player.setAside(this, player.hand);
        break;
      case 'start-of-turn':
        player.pickUp(this, player.asidePile);
        await player.draw(1);
        break;
      default:
        break;
    }
  }
}
