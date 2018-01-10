import Card from 'cards/Card';

export default class HauntedWoods extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action', 'Attack', 'Duration');
  async onPlay(player) {
    this.ignoreCleanup = true;
    player.addPersistentEffect('buy', this);
  }

  willTriggerOn(event, player, persistent) {
    return (
      (persistent === 'persistent' && event.name === 'buy' && event.triggeringPlayer !== player) ||
      (event.name === 'start-of-turn' && event.triggeringPlayer === player && player.playArea.includes(this))
    );
  }

  async onTrigger(event, player, persistent) {
    if (persistent === 'persistent') {
      while (event.triggeringPlayer.hand.length > 1) {
        const [card] = await event.triggeringPlayer.selectCards({
          min: 1,
          max: 1,
          message: 'Choose which card to put on your deck first',
        });
        if (card) {
          event.triggeringPlayer.moveCard(card, event.triggeringPlayer.hand, event.triggeringPlayer.deck);
        }
      }
      if (event.triggeringPlayer.hand.length > 0) {
        event.triggeringPlayer.moveCard(event.triggeringPlayer.hand.last(), event.triggeringPlayer.hand, event.triggeringPlayer.deck);
      }
    } else {
      player.removePersistentEffect('buy', this);
      await player.draw(3);
      this.ignoreCleanup = false;
    }
  }
}
