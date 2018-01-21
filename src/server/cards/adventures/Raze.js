import Card from 'cards/Card';

export default class Raze extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const choice = await player.selectOption(['Trash Raze', 'Trash a card from your hand']);
    let trashedCard;
    switch (choice) {
      case 0:
        trashedCard = this;
        await player.trash(this, player.playArea);
        break;
      case 1:
        [trashedCard] = await player.selectCards({
          min: 1,
          max: 1,
          message: 'Choose a card to trash',
        });
        if (trashedCard) {
          await player.trash(trashedCard);
        }
        break;
    }

    if (trashedCard) {
      const topCards = player.lookAtTopOfDeck(trashedCard.cost.coin);
      if (topCards.length > 0) {
        const [cardToPutInHand] = await player.selectCards({
          min: 1,
          max: 1,
          pile: topCards,
          message: 'Choose a card to put in your hand. The rest will be discarded',
        });
        if (cardToPutInHand) {
          player.moveCard(cardToPutInHand, player.deck, player.hand);
        }
        for (const card of topCards) {
          if (card !== cardToPutInHand) {
            await player.discard(card, player.deck);
          }
        }
      }
    }
  }
}
