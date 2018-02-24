import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Caravan'];
  });

  test('should give stuff now and next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Caravan']);
    await waitForNextInput();
    respondWithCard('Caravan');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(6);
  });
};
