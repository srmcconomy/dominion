import Card from 'cards/Card';

export default class ThroneRoom extends Card {
  static cost = {coin:4};
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: card => card.types.has('Action'), message: 'Choose an Action card to play twice' });
    if (card) {
      this.card = card
      await player.play(this.card);
      if (player.playArea.hasID(this.card.id)) {
        await player.pickUp(this.card);
        await player.play(this.card);
        this.ignoreCleanUp = this.card.ignoreCleanUp;
      }
    }
  }

  async onTurnStart(player) {
    if (player.playArea.hasID(this.card.id)) {
      await this.card.onTurnStart(player);
      this.ignoreCleanUp = this.card.ignoreCleanUp;

    } else {
      this.ignoreCleanUp = false;
    }
  }
}
