import Card from 'cards/Card';
import Pile from 'utils/Pile';
 
export default class Lookout extends Card {
  static cost = 3;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
   
    const cards = await player.lookAtTopOfDeck(3);

    for (let i = 0; i < cards.size; i++) {
      const options = ['trash', 'discard', 'put on top of your deck'];
      const [card] = await player.selectCards( {min: 1, max: 1, pile: aside, message: 'Select a card to ' + options[i] + '.'})
      switch (i) {
        case 0:
         await player.trash(card, aside);
        break;
        case 1:
         await player.discard(card, aside);
        break;
        case 2:
         player.topDeck(card, aside);
        break;
      }
      aside.asyncForEach(card => player.discard(card)); // Sanity
    }
  }
}