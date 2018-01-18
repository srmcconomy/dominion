import Card from 'cards/Card';

export default class Cultist extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack', 'Looter']);
  async onPlay(player, event) {
    await player.draw(2);
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      // other.gain('Ruins');
    });
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.title === 'Cultist',
      message: 'Select a Cultist to play'
    });
    if (card) await player.play(card);
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    event.card === this;
  }

  async onTrigger(event, player) {
    await player.draw(3);
  }
}
