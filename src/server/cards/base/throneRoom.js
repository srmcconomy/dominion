import Card from 'cards/Card';

export default class ThroneRoom extends Card {
  static cost = {coin:4};
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 0, max: 1, predicate: card => card.types.has('Action'), message: 'Choose an Action card to play twice' });
    if (!this.cards) this.cards = [];
    if (card) {
      this.cards.push(card)
      await player.play(card);
      player.cardsPlayedThisTurn.push(card);
      await card.onPlay(player);
      if (player.playArea.hasID(card.id) && Card.classes.get(card.title).types.has('Duration')) {
        this.ignoreCleanUp = card.ignoreCleanUp || this.ignoreCleanUp;
      }
    }
  }

  async onTurnStart(player) {
    this.ignoreCleanUp = false;
    for (let i = 0; i < this.cards.length; i++){
      if (player.playArea.hasID(this.cards[i].id)) {
        await this.cards[i].onTurnStart(player);
        this.ignoreCleanUp = this.cards[i].ignoreCleanUp || this.ignoreCleanUp;
      }
    }
  }
}
