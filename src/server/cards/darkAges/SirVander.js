import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class SirVander extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    await KnightAttack(player, event, this);
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    event.cards.includes(this);
  }

  async onTrigger(event, player) {
    await player.gain('Gold');
  }
}
