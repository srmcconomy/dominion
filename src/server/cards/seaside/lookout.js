import Card from 'cards/Card';
import Pile from 'utils/Pile';
 
export default class Lookout extends Card {
  static cost = 3;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
   
    const cards = await player.lookAtTopOfDeck(3);
    const cardsInspected = new Pile();

    for(let i = 0; i < cards.length; i++) {
          cardsInspected.push(cards[i]);
    }

    for (let i = 0; i < cards.length; i++) {
      const options = ['trash', 'discard', 'put on top of your deck'];
      const [card] = await player.selectCards( {min: 1, max: 1, pile: cardsInspected, message: 'Select a card to ' + options[i] + '.'})
      switch (i) {
        case 0:
         await player.trash(card, player.deck);
        break;
        case 1:
         await player.discard(card, player.deck);
        break;
        case 2:
         //Do nothing, card already on deck
        break;
      }
      cardsInspected.delete(card);
    }
  }
}