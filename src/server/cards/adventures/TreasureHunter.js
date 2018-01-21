import Card from 'cards/Card';

export default class TreasureHunter extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Traveller']);
  async onPlay(player) {
    player.actions++;
    player.money++;
    const rightPlayer = player.game.playerOrder[
      player.game.currentPlayerIndex === 0 ? player.game.playerOrder.length - 1 : player.game.currentPlayerIndex - 1
    ];
    for (let i = 0; i < rightPlayer.cardsGainedThisTurn.length; i++) {
      await player.gain('Silver');
    }
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      player.playArea.includes(this) &&
      player.game.supplies.get('Warrior').cards.length > 0
    );
  }

  async onTrigger(event, player) {
    event.handledForCard.add(this);
    player.moveCard(this, player.playArea, player.game.supplies.get('TreasureHunter').cards);
    player.moveCard(player.game.supplies.get('Warrior').cards, player.discardPile);
  }
}
