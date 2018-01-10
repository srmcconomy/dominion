import Card from 'cards/Card';

export default class Giant extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action', 'Attack');
  async onPlay(player, event) {
    player.flipJourneyToken();
    if (player.journeyToken === 'faceUp') {
      player.money += 5;
      await player.forEachOtherPlayer(async other => {
        if (event.handledByPlayer.get(other)) {
          return;
        }
        const [card] = other.lookAtTopOfDeck(1);
        if (card && card.cost.potion === 0 && card.cost.debt === 0 && card.cost.coin >= 3 && card.cost.coin <= 6) {
          await other.trash(card, other.deck);
        } else {
          await other.discard(card, other.deck);
          await other.gain('Curse');
        }
      });
    } else {
      player.money += 1;
    }
  }
}
