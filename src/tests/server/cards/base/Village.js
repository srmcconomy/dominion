import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Village'];
  });

  test('should increase actions by 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Village']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.actions).toBe(2);
  });

  test('should draw a card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Village']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
  });
};
