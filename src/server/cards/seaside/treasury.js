import Card from 'cards/Card';

export default class Treasury extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
  }
  async onDiscard(player, whereFrom) {
    if (whereFrom === player.playArea) {
      let gainedVP = false;
      for (let i = 0; i < player.cardsGainedThisTurn.length; i++) {
        if (player.cardsGainedThisTurn[i].types.has('Victory')) {
          gainedVP = true;
        }
      }
      if (!gainedVP) {
        await player.topDeck(this, player.discardPile);
      }
    }
  }
}
