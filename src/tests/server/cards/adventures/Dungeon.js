import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, respondWithCardsFromHand, respondWithChoice, skipToNextTurn, respondWith } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should give 1 action and 2 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dungeon']);
    await waitForNextInput();
    respondWithCardFromHand('Dungeon');
    await waitForNextInput();

    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(6);
  });

  test('should cause the player to discard two cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dungeon']);

    await waitForNextInput();
    respondWithCardFromHand('Dungeon');
    await waitForNextInput();
    respondWithCardsFromHand(['Copper', 'Copper']);
    await waitForNextInput();

    expect(player.hand.length).toBe(4);
  });

  test('should give two cards and discard two cards at the start of next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dungeon']);

    await waitForNextInput();
    respondWithCardFromHand('Dungeon');
    await waitForNextInput();
    respondWithCardsFromHand(['Copper', 'Copper']);

    await skipToNextTurn(player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();

    expect(player.hand.length).toBe(7);
    respondWithCardsFromHand(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
  });
};
