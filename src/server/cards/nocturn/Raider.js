import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Raider extends Card {
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set(['Night', 'Duration', 'Attack']);
  async onPlay(player, event) {
    const uniqueNames = [];
    player.playArea.forEach(c => {
      if (!uniqueNames.includes(c.title)) uniqueNames.push(c.title);
    });
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other) || other.hand.length < 5) {
        return;
      }
      const [card] = await other.selectCards({
        min: 1,
        max: 1,
        predicate: c => uniqueNames.includes(c.title),
        message: 'Discard down to three cards in hand'
      });
      if (card) {
        await other.discard(card);
      } else other.revealHand();
    });
    this.ignoreCleanUp = true;
  }

  willTriggerOn(event, player) {
    return (
      event.name === 'start-of-turn' &&
      event.triggeringPlayer === player &&
      player.playArea.includes(this)
    );
  }

  async onTrigger(event, player) {
    player.money += 3;
    this.ignoreCleanUp = false;
  }
}
