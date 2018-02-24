import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Baron'];
  });

  test('should allow discarding of Estates for money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Estate', 'Copper', 'Copper', 'Baron']);
    await waitForNextInput();
    respondWithCard('Baron');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(4);
  });

  test('should gain estate if none in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Baron']);
    await waitForNextInput();
    respondWithCard('Baron');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(0);
    expect(player.discardPile.last().title).toBe('Estate');
  });

  test('should gain estate if none in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Estate', 'Copper', 'Copper', 'Baron']);
    await waitForNextInput();
    respondWithCard('Baron');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(0);
    expect(player.discardPile.last().title).toBe('Estate');
  });
};
