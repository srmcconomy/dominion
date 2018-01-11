import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCardsFromHand, respondWithCardFromHand, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should have 1 action after playing and draw 4 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cellar']);
    await waitForNextInput();
    respondWithCardFromHand('Cellar');
    await waitForNextInput();
    respondWithCardsFromHand(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(4);
  });


  test('should allow discard of no cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cellar']);
    await waitForNextInput();
    respondWithCardFromHand('Cellar');
    await waitForNextInput();
    respondWithCardsFromHand([]);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
  });
};
