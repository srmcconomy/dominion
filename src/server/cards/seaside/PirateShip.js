import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class PirateShip extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const choice = await player.selectOption([
      `+${player.mats.pirateShip} Coins`,
      'Treasure Attack'
    ]);
    switch (choice) {
      case 0:
        player.game.log(`${player.name} gains $${player.mats.pirateShip}`);
        player.money += player.mats.pirateShip;
        break;
      case 1:
        {
          player.game.log(`${player.name} plays Pirate Ship for its Attack`);
          let trashedTreasure = false;
          await player.forEachOtherPlayer(async other => {
            if (event.handledByPlayer.get(other)) {
              return;
            }
            const cards = await other.lookAtTopOfDeck(2);
            player.game.log(`${other.name} reveals ${cards.map(c => c.title).join(', ')}`);

            if (cards.some(c => c.types.has('Treasure'))) {
              const cardsInspected = new Pile();
              for (let i = 0; i < cards.length; i++) {
                cardsInspected.push(cards[i]);
              }
              const [card] = await player.selectCards({
                min: 1,
                max: 1,
                pile: cardsInspected.filter(c => c.types.has('Treasure')),
                message: 'Choose a card to trash'
              });
              if (card) {
                await other.trash(card, other.deck);
                cardsInspected.delete(card);
                trashedTreasure = true;
              }
              cardsInspected.forEach(c => {
                other.discard(c, other.deck);
              });
            }
          });
          if (trashedTreasure) player.mats.pirateShip++;
        }
        break;
      default:
        break;
    }
  }
}
