import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Monastery'];
  });

  test('should trash 2 if gained two', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Workshop', 'Silver', 'Copper', 'Duchy', 'Monastery']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithCard('Monastery');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Duchy');
    respondWithCard('Copper');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Copper');
  });
};
