import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Wharf'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Wharf']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Duration');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give cards and a buy now and next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Wharf']);
    await waitForNextInput();
    respondWithCard('Wharf');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.buys).toBe(2);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(player.buys).toBe(2);
  });
};
