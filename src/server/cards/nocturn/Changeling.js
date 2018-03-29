import Card from 'cards/Card';

export default class Changeling extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Night']);
  async onPlay(player) {
    if (player.playArea.includes(this)) await player.trash(this, player.playArea);
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => {
        if (s.cards.length > 0) {
          return player.playArea.some(c => c.title === s.cards.last().title);
        }
        return false;
      },
      message: 'Select a copy of a card in play to gain'
    });
    if (supply) await player.gain(supply.title);
  }

  canTriggerOn(event, player, persistent) {
    return event.name === 'gain' &&
    event.triggeringPlayer === player &&
    event.card.cost.coin >= 3 &&
    player.game.supplies.get('Changeling').cards.length > 0 &&
    event.card.title !== 'Changeling' &&
    persistent === true;
  }

  async onTrigger(event, player) {
    player.exchange(event.card, 'Changeling', event.destination, event.destination);
  }
}
