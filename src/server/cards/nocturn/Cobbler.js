import Card from 'cards/Card';

export default class Cobbler extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Night', 'Duration']);
  async onPlay(player) {
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
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 4 })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title, player.hand);
    }
    this.ignoreCleanUp = false;
  }
}
