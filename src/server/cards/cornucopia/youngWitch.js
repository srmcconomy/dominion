import Card from 'cards/Card';

export default class YoungWitch extends Card {
  static cost = {coin:4};
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    await player.draw(2);
    const cards = await player.selectCards({min:2, max:2, message: 'Discard two cards'});
    for (let i = 0; i < cards.length; i++) {
    	await player.discard(cards[i]);
    }
    await player.forEachOtherPlayer(async other => {
    	if (await other.handleOwnReactions('attack', player, this)) {
        	return;
      	}
      	const [card] = await other.selectCards({min:0, max:1, predicate: c => c.title === Card.classes.get('YoungWitch').bane, message: 'Choose to reveal a bane card or not'});
      	if (!card) {
      		await other.gain('Curse');
      	}
  	});
  }


  static addDependancies(kingdomArray, game) {
    console.log(kingdomArray)
    const possibleBanes = [];
    const dependancies = [];
    Card.classes.forEach(c => {
      if (!c.title) return;
      if ((c.cost.coin === 2 || c.cost.coin === 3) &&
        !c.cost.debt  && !c.cost.potion &&
        !kingdomArray.includes(c.title) && c.supplyCategory === 'kingdom') possibleBanes.push(c.title);
    });
    this.bane = possibleBanes[Math.floor(Math.random() * possibleBanes.length)];
    game.log(`${this.bane} is Young Witch's Bane`);
    dependancies.push(this.bane);
    (Card.classes.get(this.bane).addDependancies(kingdomArray, game)).forEach (d => {
      dependancies.push(d);
    })

    return dependancies;
  }
}
