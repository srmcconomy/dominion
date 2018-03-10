import Card from 'cards/Card';

export default class Ambassador extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Reveal a card for your opponents to gain'
    });
    player.game.log(`${player.name} reveals ${card.title}`);
    const cards = await player.selectCards({
      min: 0,
      max: 2,
      predicate: c => c.name === card.title,
      message: 'Select 0-2 cards to return'
    });
    let returnedCards = false;
    if (player.game.supplies.get(card.title)) {
      if (player.game.supplies.get(card.title).category !== 'nonSupply') {
        for (let i = 0; i < cards.length; i++) {
          await player.returnToSupply(cards[i]);
          returnedCards = true;
        }
        await player.forEachOtherPlayer(async other => {
          if (event.handledByPlayer.get(other)) {
            return;
          }
          await other.gain(card.title);
        });
      }
    }
    if (!returnedCards) player.game.log(`${player.name} fails to return cards`);
  }
}
