import Card from 'cards/Card';

export default class Feodum extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Victory']);
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }

  getVpValue(player) {
    return Math.floor(player.deck.filter(c => c.title === 'Silver').length / 3);
  }

  willTriggerOn(event, player) {
    return event.name === 'trash' &&
    event.triggeringPlayer === player &&
    event.cards.includes(this);
  }

  async onTrigger(event, player) {
    for (let i = 0; i < 3; i++) {
      await player.gain('Silver');
    }
  }
}
