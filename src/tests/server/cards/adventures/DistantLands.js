import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['DistantLands'];
  });

  test('DistantLands should be worth 0 if not on mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DistantLands']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });

  test('DistantLands should be worth 4 if on mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DistantLands']);
    setDeck(player, Array(5).fill('Copper'));
    await waitForNextInput();
    respondWithCard('DistantLands');
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(4);
  });

  test('DistantLands should have different scores for where it was found', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'DistantLands', 'DistantLands']);
    setDeck(player, Array(5).fill('Copper'));
    await waitForNextInput();
    respondWithCard('DistantLands');
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(4);
  });
};
