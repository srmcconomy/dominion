import Card from 'cards/Card';

export default class Sauna extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.title === 'Avanto',
      message: 'Avanto a Sauna to play'
    });
    if (card) await player.play(card);
  }

  willTriggerOn(event, player) {
    return event.name === 'play' &&
    event.triggeringPlayer === player &&
    player.playArea.includes(this) &&
    (event.card ? event.card.title === 'Silver' : false) &&
    player.hand.length > 0;
  }

  async onTrigger(event, player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'You may trash a card'
    });
    if (card) await player.trash(card);
  }
}
