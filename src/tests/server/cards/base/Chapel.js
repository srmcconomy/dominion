import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should trash 4 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Chapel']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(game.trash.length).toBe(4);
  });

  test('should allow trashing 0 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Chapel']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards([]);
    const { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);
    expect(player.hand.length).toBe(4);
    expect(game.trash.length).toBe(0);
  });
};
