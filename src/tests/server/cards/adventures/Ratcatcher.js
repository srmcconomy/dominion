import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, respondWithCardsFromHand, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ratcatcher'];
  });

  test('should give 1 card and 1 action', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ratcatcher']);
    await waitForNextInput();
    respondWithCardFromHand('Ratcatcher');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('should move itself to the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ratcatcher']);
    await waitForNextInput();
    respondWithCardFromHand('Ratcatcher');
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.mats.tavern.length).toBe(1);
  });

  test("should trigger at the start of the player's turn, allowing them to trash a card", async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ratcatcher']);
    await waitForNextInput();
    respondWithCardFromHand('Ratcatcher');
    await skipToNextTurn(player);
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithCardFromHand('Copper');
    await waitForNextInput();

    expect(game.trash.last().title).toBe('Copper');
  });
};
