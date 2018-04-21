import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Merchant'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Merchant']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should have 1 action and 5 cards after playing', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Merchant']);
    await waitForNextInput();
    respondWithCard('Merchant');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });

  test('should get +1 Coin for first Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Silver', 'Merchant']);
    await waitForNextInput();
    respondWithCard('Merchant');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(3);
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(5);
  });
};
