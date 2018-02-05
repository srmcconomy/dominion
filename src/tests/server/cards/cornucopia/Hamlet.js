import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Hamlet'];
  });

  test('should allow both discards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hamlet']);
    await waitForNextInput();
    respondWithCard('Hamlet');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(2);
    expect(player.buys).toBe(2);
    expect(player.discardPile.length).toBe(2);
  });

  test('should allow only action discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hamlet']);
    await waitForNextInput();
    respondWithCard('Hamlet');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
    expect(player.buys).toBe(1);
    expect(player.discardPile.length).toBe(1);
  });

  test('should allow only buy discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hamlet']);
    await waitForNextInput();
    respondWithCard('Hamlet');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.discardPile.length).toBe(1);
  });

  test('should allow for no discards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hamlet']);
    await waitForNextInput();
    respondWithCard('Hamlet');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(1);
    expect(player.discardPile.length).toBe(0);
  });

  test('should work on empty hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Hamlet']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Hamlet');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(1);
    expect(player.discardPile.length).toBe(0);
  });
};
