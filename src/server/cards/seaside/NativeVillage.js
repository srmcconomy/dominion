import Card from 'cards/Card';

export default class NativeVillage extends Card {
  name = 'Native Village';
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    const [card] = player.lookAtTopOfDeck(1);
    const choice = await player.selectOption([
      'Place on Native Village mat',
      'Pick up entire mat into your hand'
    ]);
    if (card) {
      switch (choice) {
        case 0:
          player.game.log(`${player.name} puts a card on their Native Village mat`);
          player.moveCard(card, player.deck, player.mats.nativeVillage);
          // Somehow tell the player what they put on mat/allow them to inspect their mat at any time
          break;
        case 1:
          player.game.log(`${player.name} puts their Native Village mat into their hand`);
          while (player.mats.nativeVillage.size > 0) {
            player.pickUp(player.mats.nativeVillage.last(), player.mats.nativeVillage);
          }
          break;
        default:
          break;
      }
    }
  }
}
