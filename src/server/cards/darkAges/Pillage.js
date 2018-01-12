import Card from 'cards/Card';

export default class Pillage extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    if (player.playArea.includes(this)) await player.trash(this);

    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }

      if (other.hand.size >= 5) {
        other.revealHand();
        const [card] = await player.selectCards({
          min: 1,
          max: 1,
          pile: other.hand,
          message: `Select a card for ${other.name} to discard`
        });
        other.discard(card);
      }
    });

    await player.gain('Spoils');
    await player.gain('Spoils');
  }

  static getDependencies() {
    return ['Spoils'];
  }
}
