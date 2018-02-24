import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should have 1 action and 5 cards after playing', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Merchant']);
    await waitForNextInput();
    respondWithCard('Merchant');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });

  test('should get +1 Coin for first Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Silver', 'Merchant']);
    await waitForNextInput();
    respondWithCard('Merchant');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(3);
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(5);
  });
};
