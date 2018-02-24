import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Plaza'];
  });

  test('should discard treasures for coin tokens', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Plaza', 'Silver', 'Copper', 'Plaza', 'Plaza']);
    await waitForNextInput();
    respondWithCard('Plaza');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
    expect(player.coinTokens).toBe(1);
    expect(player.discardPile.last().title).toBe('Copper');
    respondWithCard('Plaza');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(3);
    expect(player.coinTokens).toBe(1);
    expect(player.discardPile.last().title).toBe('Copper');
    respondWithCard('Plaza');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(4);
    expect(player.coinTokens).toBe(2);
    expect(player.discardPile.last().title).toBe('Silver');
  });
};
