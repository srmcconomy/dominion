import Card from 'cards/Card';

export default class NativeVillage extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    const [card] = player.lookAtTopOfDeck(1);
    if (card) {
      const choice = await player.selectOption([
        'Place on Native Village mat',
        'Pick up entire mat into your hand'
      ]);
      switch (choice) {
        case 0:
          player.moveCard(card, player.deck, player.nativeVillageMat);
          // Somehow tell the player what the put on mat/allow them to inspect their mat at any time
          break;
        case 1:
          while (player.nativeVillageMat.size > 0) {
            player.pickUp(player.nativeVillageMat.last(), player.nativeVillageMat);
          }
          break;
        default:
          break;
      }
    }
  }
}
