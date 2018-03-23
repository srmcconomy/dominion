import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['PoorHouse'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['PoorHouse']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(1);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
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
