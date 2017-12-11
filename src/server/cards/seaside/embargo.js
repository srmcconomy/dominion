import Card from 'cards/Card';

export default class Embargo extends Card {
  static cost = {coin:2};
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    const [supply] = await player.selectSupplies({
      min:1,
      max:1,
      message:'Choose a supply to embargo'
    });
    await player.trash(this, this.playArea);
    if (supply) {
      if (supply.tokens.embargoTokens){
        supply.tokens.embargoTokens++;
      } else {
        supply.tokens.embargoTokens = 1;
      }
    }
  }
}
