import Card from 'cards/Card';
import KnightAttack from 'cards/darkAges/KnightAttack';

export default class SirMichael extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack', 'Knight']);
  // static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      if (other.hand.size > 3) {
        const cards = await other.selectCards({
          min: other.hand.size - 3,
          max: other.hand.size - 3,
          message: 'Discard down to three cards in hand'
        });
        for (let i = 0; i < cards.length; i++) {
          await other.discard(cards[i]);
        }
      }
    });
    
    await KnightAttack(player, event, this);
  }
}
