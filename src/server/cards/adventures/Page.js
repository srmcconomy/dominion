import Card from 'cards/Card';

export default class Page extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Traveller']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      player.playArea.includes(this) &&
      player.game.supplies.get('TreasureHunter').cards.length > 0
    );
  }

  async onTrigger(event, player) {
    event.handledForCard.add(this);
    player.moveCard(this, player.playArea, player.game.supplies.get('Page').cards);
    player.moveCard(player.game.supplies.get('TreasureHunter').cards, player.discardPile);
  }
}
