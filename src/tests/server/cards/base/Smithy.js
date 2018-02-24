import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Smithy'];
  });

  test('should draw three cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Smithy']);
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });
};
