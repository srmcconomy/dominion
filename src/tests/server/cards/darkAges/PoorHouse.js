import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['PoorHouse'];
  });

  test('should give 4 with no treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Estate', 'Estate', 'PoorHouse']);
    await waitForNextInput();
    respondWithCard('PoorHouse');
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('should give 0 with all treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PoorHouse']);
    await waitForNextInput();
    respondWithCard('PoorHouse');
    await waitForNextInput();
    expect(player.money).toBe(0);
  });

  test('should count multiple typed cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Harem', 'Harem', 'PoorHouse']);
    await waitForNextInput();
    respondWithCard('PoorHouse');
    await waitForNextInput();
    expect(player.money).toBe(2);
  });

  test('should give 4 with empty hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['PoorHouse']);
    await waitForNextInput();
    respondWithCard('PoorHouse');
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('shouldn\'t go negative', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'PoorHouse']);
    await waitForNextInput();
    respondWithCard('PoorHouse');
    await waitForNextInput();
    expect(player.money).toBe(0);
  });
};
