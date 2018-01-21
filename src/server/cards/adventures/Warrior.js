import Card from 'cards/Card';

export default class Warrior extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack', 'Traveller']);
  async onPlay(player, event) {
    await player.draw(2);
    const numTravellersInPlay = player.playArea.filter(card => card.types.has('Traveller')).length;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      for (let i = 0; i < numTravellersInPlay; i++) {
        const [card] = other.lookAtTopOfDeck(1);
        if (card) {
          await other.discard(card, other.deck);
          if (card.cost.potion === 0 && card.cost.debt === 0 && (card.cost.coin === 3 || card.cost.coin === 4)) {
            await other.trash(card, other.discardPile);
          }
        }
      }
    });
  }

  canTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      player.playArea.includes(this) &&
      player.game.supplies.get('Hero').cards.length > 0
    );
  }

  async onTrigger(event, player) {
    event.handledForCard.add(this);
    player.moveCard(this, player.playArea, player.game.supplies.get('Warrior').cards);
    player.moveCard(player.game.supplies.get('Hero').cards, player.discardPile);
  }
}
