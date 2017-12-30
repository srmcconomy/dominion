import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class PirateShip extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    const choice = await player.selectOption([
      `+${PirateShip.pirateShipMats.get(player)} Coins`,
      'Treasure Attack'
    ]);
    switch (choice) {
      case 0:
        player.money += PirateShip.pirateShipMats.get(player);
        break;
      case 1:
        {
          let trashedTreasure = false;
          await player.forEachOtherPlayer(async other => {
            if (event.handledByPlayer.get(other)) {
              return;
            }
            const cards = await other.lookAtTopOfDeck(2);

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
          if (trashedTreasure) PirateShip.pirateShipMats.set(player, PirateShip.pirateShipMats.get(player) + 1);
        }
        break;
      default:
        break;
    }
  }

  static setup(game) {
    PirateShip.pirateShipMats = new Map();
    game.players.forEach(player => {
      PirateShip.pirateShipMats.set(player, 0);
    });
  }
}
