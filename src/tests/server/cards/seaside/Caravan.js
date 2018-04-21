import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Caravan'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Caravan']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Duration');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
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
