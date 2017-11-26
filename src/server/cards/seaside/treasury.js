import Card from 'cards/Card';

export default class Treasury extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.money++;
  }
  async onDiscard(player, whereFrom) {
  	if (whereFrom === player.playArea) {
	  	let gainedVP = 0;
	  	for (let i = 0; i < player.cardsGained.length; i++) {
	  		if (player.cardsGained[i].types.has('Victory')) {
	  			gainedVP = 1;
	  		}
	  	}
	  	if (gainedVP === 0) {
	  		await player.topDeck(this, player.discardPile);
	  	}
	}
  }
}
