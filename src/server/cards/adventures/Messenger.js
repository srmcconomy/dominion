import Card from 'cards/Card';

export default class Messenger extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    player.money += 2;
    const choice = await player.selectOption(['Put your deck into your discard pile', "Don't"]);
    if (choice === 0) {
      while (player.deck.length > 0) {
        player.moveCard(player.deck.last(), player.deck, player.discardPile);
      }
    }
  }

  willTriggerOn(event, player) {
    return event.name === 'buy' && event.triggeringPlayer === player && event.card === this && player.cardsBoughtThisTurn.length === 0;
  }

  async onTrigger(event, player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => s.cards.length > 0 && s.cards.last().cost.isLessThanEqualTo({ coin: 4 }),
    });
    if (supply) {
      await player.gain(supply.title);
      await player.forEachOtherPlayer(async other => other.gain(supply.title));
    }
  }
}
