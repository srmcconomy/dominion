import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['DenOfSin'];
  });

  test('should give draw next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('DenOfSin');
    await waitForNextInput();
    respondWithCard('DenOfSin');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(7);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });
};
