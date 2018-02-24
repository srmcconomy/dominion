import Card from 'cards/Card';

export default class Fugitive extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set('Action', 'Traveller');
  async onPlay(player) {
    await player.draw(2);
    player.actions++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to discard'
    });
    if (card) {
      await player.discard(card);
    }
  }

  canTriggerOn(event, player) {
    return event.name === 'discard' && event.triggeringPlayer === player && event.card === this && player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    event.handledByPlayer.set(player, true);
    player.moveCard(this, player.playArea, player.game.supplies.get('Fugitive'));
    player.moveCard(player.game.supplies.get('Disciple'), player.discardPile);
  }
}
