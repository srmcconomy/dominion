import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['CandlestickMaker'];
  });

  test('should give stuff', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CandlestickMaker']);
    await waitForNextInput();
    respondWithCard('CandlestickMaker');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.coinTokens).toBe(1);
  });
};
