import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['MerchantGuild'];
  });

  test('buys gain coin tokens', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'MerchantGuild']);
    await waitForNextInput();
    respondWithCard('MerchantGuild');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.buys).toBe(2);
    expect(player.money).toBe(3);
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.coinTokens).toBe(1);
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.coinTokens).toBe(2);
  });
};
