import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Laboratory'];
  });

  test('should give 1 Action and 2 draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Laboratory']);
    await waitForNextInput();
    respondWithCard('Laboratory');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(6);
  });
};
