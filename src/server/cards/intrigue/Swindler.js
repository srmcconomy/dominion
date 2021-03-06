import Card from 'cards/Card';

export default class Swindler extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      const [card] = await other.lookAtTopOfDeck(1);
      if (!card) {
        return;
      }
      player.game.log(`${other.name} reveals ${card.title}`);
      await other.trash(card, other.deck);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          player.cardCostsEqualTo(s.cards.last(), card)
        ),
        message: `Choose a card to replace ${other.name}'s ${card.title}`,
      });
      if (!supply) {
        return;
      }
      await other.gain(supply.title);
    });
  }
}
