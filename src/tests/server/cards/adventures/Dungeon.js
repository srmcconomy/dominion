import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWith } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Dungeon'];
  });

  test('should give 1 action and 2 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dungeon']);
    await waitForNextInput();
    respondWithCard('Dungeon');
    await waitForNextInput();

    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(6);
  });

  test('should cause the player to discard two cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dungeon']);

    await waitForNextInput();
    respondWithCard('Dungeon');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();

    expect(player.hand.length).toBe(4);
  });

  test('should give two cards and discard two cards at the start of next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dungeon']);

    await waitForNextInput();
    respondWithCard('Dungeon');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);

    await skipToNextTurn(player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();

    expect(player.hand.length).toBe(7);
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
  });
};
