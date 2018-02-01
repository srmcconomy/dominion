import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Island'];
  });

  test('Gardens should be worth 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Island']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(2);
  });

  test('Can put on mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Island']);
    setDeck(player, Array(5).fill('Copper'));
    await waitForNextInput();
    respondWithCard('Island');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    expect(player.mats.island.length).toBe(2);
    game.endOfGame();
    expect(player.score).toBe(3);
  });
};
