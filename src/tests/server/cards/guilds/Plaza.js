import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Plaza'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Plaza']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
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
