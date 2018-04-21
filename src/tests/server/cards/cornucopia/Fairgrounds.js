import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Fairgrounds'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Fairgrounds']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(6);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Fairgrounds should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Gold', 'Fairgrounds']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });

  test('Fairgrounds should be worth 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'Fairgrounds']);
    setDeck(player, []);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(2);
  });

  test('Fairgrounds should be worth 6', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'Fairgrounds']);
    setDeck(player, ['Moat', 'Village', 'Cellar', 'Chapel', 'Mine', 'Militia', 'Witch', 'Smithy', 'Festival', 'Library']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(6);
  });
};
