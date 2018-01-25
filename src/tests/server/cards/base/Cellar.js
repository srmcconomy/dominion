import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCards, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should have 1 action after playing and draw 4 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cellar']);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(4);
  });


  test('should allow discard of no cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cellar']);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards([]);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
  });
};
