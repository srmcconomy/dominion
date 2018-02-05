import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Menagerie'];
  });

  test('should draw 3 with no duplicates', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Estate', 'Menagerie']);
    await waitForNextInput();
    respondWithCard('Menagerie');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(player.actions).toBe(1);
  });

  test('should draw 1 with duplicates', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Gold', 'Menagerie']);
    await waitForNextInput();
    respondWithCard('Menagerie');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('should draw 3 with empty hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Menagerie']);
    await waitForNextInput();
    respondWithCard('Menagerie');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
  });
};
