import Card from 'cards/Card';

export default class DeathCart extends Card {
  name = 'Death Cart';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Looter']);
  async onPlay(player) {
    player.money += 5;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Action'),
      message: 'Choose an action card to trash'
    });
    if (card) {
      await player.trash(card);
    }
    else if (player.playArea.includes(this)) {
      await player.trash(this, player.playArea);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'gain' &&
    event.triggeringPlayer === player &&
    event.card === this;
  }

  async onTrigger(event, player) {
    await player.gain('Ruins');
    await player.gain('Ruins');
  }
}
