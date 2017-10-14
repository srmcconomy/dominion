import Card from '../card';
import { Set } from 'immutable';

export default class Bureaucrat extends Card {
  static name = 'Bureaucrat';
  static cost = 4;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.gain('Silver', 'topdeck');
    await player.forEachOtherPlayer(async other => {
      if (other.hand.some(card => card.types.has('Victory'))) {
        const c = await other.selectCard(1, card => card.types.has('Victory'));
        other.topdeck(c);
      } else {
        other.revealHand();
      }
    });
  }
}

Card.classes.Bureaucrat = Bureaucrat;
