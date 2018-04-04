import Card from 'cards/Card';

export default class Alchemist extends Card {
  static cost = new Card.Cost({ coin: 3, potion: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(2);
    player.actions++;
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      player.playArea.includes(this) &&
      player.playArea.some(c => c.title === 'Potion')
    );
  }

  async onTrigger(event, player) {
    player.topDeck(this, player.PlayArea);
  }
}
