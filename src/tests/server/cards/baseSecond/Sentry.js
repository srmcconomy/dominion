import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sentry']);
    setDeck(player, ['Copper', 'Copper', 'Duchy', 'Duchy', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sentry');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.length).toBe(2);
    expect(player.discardPile.length).toBe(0);
    expect(game.trash.length).toBe(2);
  });

  test('should discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sentry']);
    setDeck(player, ['Copper', 'Copper', 'Duchy', 'Duchy', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sentry');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.length).toBe(2);
    expect(player.discardPile.length).toBe(2);
    expect(game.trash.length).toBe(0);
  });

  test('should putback', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sentry']);
    setDeck(player, ['Copper', 'Copper', 'Province', 'Duchy', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sentry');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.length).toBe(4);
    expect(player.deck.last().title).toBe('Province');
    expect(player.discardPile.length).toBe(0);
    expect(game.trash.length).toBe(0);
  });
};
