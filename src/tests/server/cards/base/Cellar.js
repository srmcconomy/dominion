import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCards, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Cellar'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Cellar']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should have 1 action after playing and draw 4 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cellar']);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(4);
  });


  test('should allow discard of no cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cellar']);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards([]);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
  });
};
