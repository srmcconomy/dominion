import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Explorer'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Explorer']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should gain silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Explorer']);
    await waitForNextInput();
    respondWithCard('Explorer');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(1);
    expect(player.discardPile.length).toBe(0);
  });

  test('should gain gold with a province', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Province', 'Explorer']);
    await waitForNextInput();
    respondWithCard('Explorer');
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.hand.filter(c => c.title === 'Gold').length).toBe(1);
  });

  test('should allow not revaling province', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Province', 'Explorer']);
    await waitForNextInput();
    respondWithCard('Explorer');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(1);
  });
};
