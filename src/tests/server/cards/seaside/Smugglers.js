import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, skipToNextTurn, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    // game.getKingdomCards = () => ['Smugglers'];
  });

  test('Card not yet Made');

// should work on Gold
// shouldn\'t work on Province
// works if gained or bought
// works if muptiple cards are gainied
// works if pile was empties (valid selection but nothing happens)
// doesn't fail on play if they gained nothing
// doesn't give option to gain potion/debt cost cards
};
