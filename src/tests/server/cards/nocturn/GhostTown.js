import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['GhostTown'];
  });

  test('should give village next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('GhostTown');
    await waitForNextInput();
    respondWithCard('GhostTown');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.actions).toBe(2);
    expect(player.hand.length).toBe(6);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });
};
