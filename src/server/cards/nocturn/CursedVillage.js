import Card from 'cards/Card';

export default class CursedVillage extends Card {
  name = 'Cursed Village'
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Doom']);
  async onPlay(player) {
    player.actions += 2;
    if (player.hand.length < 6) {
      await player.draw(6 - player.hand.length);
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'would-gain' &&
    event.card === this &&
    event.triggeringPlayer === player;
  }

  async onTrigger(event, player) {
    await player.takeHex();
  }
}
