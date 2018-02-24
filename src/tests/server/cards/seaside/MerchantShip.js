import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['MerchantShip'];
  });

  test('should give $2 now and next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'MerchantShip']);
    await waitForNextInput();
    respondWithCard('MerchantShip');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.money).toBe(2);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.money).toBe(2);
  });
};
