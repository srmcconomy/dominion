import Card from 'cards/Card';

export default class Vampire extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Night', 'Attack', 'Doom']);
  async onPlay(player, event) {
    const hexs = await player.takeHex(1, false);
    const hex = hexs.last();
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      await other.receiveHex(hex, hexs);
    });
    if (hexs.includes(hex)) { // All players blocked it, still needs to find it's way to discardPile
      player.moveCard(hex, hexs, player.game.hexDiscardPile);
    }

    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
            player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 5 }) &&
            s.title !== 'Vampire'
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }

    if (player.game.supplies.get('Bat').cards.length > 0) {
      player.moveCard(this, player.playArea, player.game.supplies.get('Vampire').cards);
      player.moveCard(player.game.supplies.get('Bat').cards, player.discardPile);
    }
  }
}
