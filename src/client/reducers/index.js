import cardToShow from './cardToShow';
import game from './game';
import input from './input';
import log from './log';
import selectedCards from './selectedCards';

export default function (state = {}, action) {
  console.log(action);
  return {
    game: game(state.game, action),
    input: input(state.input, action),
    cardToShow: cardToShow(state.cardToShow, action),
    selectedCards: selectedCards(selectedCards.game, action),
    log: log(state.log, action),
  };
}
