import Card from 'cards/Card';

export default class Rats extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  static getNumberInSupply() {
    return 20;
  }
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    await player.gain('Rats');
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      predicate: c => c.title !== 'Rats',
      message: 'Choose a Card to Trash'
    });
    if (card) {
      await player.trash(card);
    } else {
      player.revealHand();
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
      event.triggeringPlayer === player &&
      event.card === this;
  }

  async onTrigger(event, player) {
    await player.draw(1);
  }
}
