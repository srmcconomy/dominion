import Card from 'cards/Card';

export default class Soldier extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set('Action', 'Attack', 'Traveller');
  async onPlay(player, event) {
    player.money += 2 + player.playArea.filter(card => card.types.has('Attack') && card !== this).length;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      if (other.hand.length >= 4) {
        const [card] = await other.selectCards({
          min: 1,
          max: 1,
          message: 'Choose a card to discard'
        });
        if (card) {
          await other.discard(card);
        }
      }
    });
  }

  canTriggerOn(event, player) {
    return event.name === 'discard' && event.triggeringPlayer === player && event.card === this && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    event.handledByPlayer.set(player, true);
    player.moveCard(this, player.playArea, player.game.supplies.get('Soldier'));
    player.moveCard(player.game.supplies.get('Fugitive'), player.discardPile);
  }
}
