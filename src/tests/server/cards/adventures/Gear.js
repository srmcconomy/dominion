import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, respondWithCardsFromHand, respondWithChoice, skipToNextTurn, respondWith } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should give 2 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gear']);
    await waitForNextInput();
    respondWithCardFromHand('Gear');
    await waitForNextInput();

    expect(player.hand.length).toBe(6);
  });

  test('should allow the player to set aside two cards', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Duchy', 'Province', 'Gear']);

    await waitForNextInput();
    respondWithCardFromHand('Gear');
    await waitForNextInput();
    respondWithCardsFromHand(['Duchy', 'Province']);
    await waitForNextInput();

    expect(player.hand.length).toBe(4);

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.hand.length).toBe(7);
    expect(player.hand).toHaveSome(c => c.title === 'Duchy');
    expect(player.hand).toHaveSome(c => c.title === 'Province');
  });

  test('should allow the player to set aside one card', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Duchy', 'Gear']);

    await waitForNextInput();
    respondWithCardFromHand('Gear');
    await waitForNextInput();
    respondWithCardFromHand('Duchy');
    await waitForNextInput();

    expect(player.hand.length).toBe(5);

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.hand.length).toBe(6);
    expect(player.hand).toHaveSome(c => c.title === 'Duchy');
  });

  test('should allow the player to set aside no cards, in which case it does not stay in play', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Duchy', 'Gear']);

    await waitForNextInput();
    respondWithCardFromHand('Gear');
    await waitForNextInput();
    respondWithCardsFromHand([]);
    await waitForNextInput();

    expect(player.hand.length).toBe(6);

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.playArea.length).toBe(0);
    expect(player.hand.length).toBe(5);
  });
};
