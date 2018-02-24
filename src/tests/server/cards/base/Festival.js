import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Festival'];
  });

  test('should give 2 Actions, 1 Buy, $2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Festival']);
    await waitForNextInput();
    respondWithCard('Festival');
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(2);
  });
};
