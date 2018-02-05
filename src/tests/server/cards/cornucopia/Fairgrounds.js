import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Fairgrounds'];
  });

  test('Fairgrounds should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Gold', 'Fairgrounds']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });

  test('Fairgrounds should be worth 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'Fairgrounds']);
    setDeck(player, []);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(2);
  });

  test('Fairgrounds should be worth 6', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'Fairgrounds']);
    setDeck(player, ['Moat', 'Village', 'Cellar', 'Chapel', 'Mine', 'Militia', 'Witch', 'Smithy', 'Festival', 'Library']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(6);
  });
};
