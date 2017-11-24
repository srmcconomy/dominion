import Card from 'cards/Card';

export default class Tactician extends Card {
  static cost = 5;
  static types = new Set(['Action','Duration']);
  async onPlay(player) {
  	console.log('HAND',player.hand, player.hand.size);
    if (player.hand.size) {
    	while (player.hand.size) {
    		await player.discard(player.hand.list[0]);
    	}
    }
    else {
    	player.durationComplete(this);
    }
  }
    async onTurnStart(player) {
	  	await player.draw(5);
	    player.actions++;
	    player.buys++;
	    player.durationComplete(this);
	}
}
