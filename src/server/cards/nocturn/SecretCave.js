import Card from 'cards/Card';

export default class SecretCave extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const choice = await player.selectOption(['Discard 3 cards', 'Don\'t']);
    if (choice === 0) {
      const cards = await player.selectCards({
        min: 3,
        max: 3,
        message: 'Select 3 cards to discard'
      });
      await player.discardAll([...cards]);
      if (cards.length === 3) this.ignoreCleanUp = true;
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'start-of-turn' &&
    event.triggeringPlayer === player &&
    player.playArea.includes(this);
  }

  async onTrigger(event, player) {
    player.money += 3;
    this.ignoreCleanUp = false;
  }
}
