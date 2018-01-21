import Card from 'cards/Card';

export default class Treasury extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
  }

  willTriggerOn(event, player) {
    return (
      event.name === 'discard' &&
      event.triggeringPlayer === player &&
      event.cards.includes(this) &&
      !player.cardsGainedThisTurn.some(card => card.types.has('Victory')) &&
      player.playArea.includes(this)
    );
  }

  async onTrigger(event, player) {
    await player.topDeck(this, player.playArea);
    event.handledForCard.add(this);
  }
}
