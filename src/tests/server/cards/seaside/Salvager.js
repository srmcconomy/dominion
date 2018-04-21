import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Salvager'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Salvager']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give coin and buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Gold', 'Salvager']);
    await waitForNextInput();
    respondWithCard('Salvager');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(6);
  });

  test('should work with potion cost cards');

  test('should work with debt cost cards');
};
