import Card from 'cards/Card';

export default class Hero extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Traveller']);
  async onPlay(player) {
    player.money += 2;
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        s.cards.last().types.has('Treasure')
      ),
      message: 'Choose a Treasure card to gain'
    });
    await player.gain(supply.title);
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      player.playArea.includes(this) &&
      player.game.supplies.get('Champion').cards.length > 0
    );
  }

  async onTrigger(event, player) {
    event.handledForCard.add(this);
    player.moveCard(this, player.playArea, player.game.supplies.get('Hero').cards);
    player.moveCard(player.game.supplies.get('Champion').cards, player.discardPile);
  }
}
