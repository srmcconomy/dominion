import Card from 'cards/Card';

export default class Urchin extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.draw(1);
    player.actions++;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      if (other.hand.size > 4) {
        const cards = await other.selectCards({
          min: other.hand.size - 4,
          max: other.hand.size - 4,
          message: 'Discard down to four cards in hand'
        });
        await other.discardAll([...cards], other.hand);
      }
    });
  }

  canTriggerOn(event, player) {
    return event.name === 'play-first' &&
      event.triggeringPlayer === player &&
      (event.card ? event.card.types.has('Attack') : false) &&
      event.card !== this &&
      player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    await player.trash(this, player.playArea);
    await player.gain('Mercenary');
  }
}
