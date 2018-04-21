import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Duke'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Duke']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Duke should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Duke']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });

  test('Duke should be worth 3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Duchy', 'Copper', 'Copper', 'Copper', 'Duke']);
    setDeck(player, ['Copper', 'Copper', 'Duchy', 'Copper', 'Duchy']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(12);
  });

  test('Duke should be worth 5', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Duchy', 'Copper', 'Duchy', 'Duke']);
    setDeck(player, ['Duchy', 'Copper', 'Duchy', 'Copper', 'Duchy']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(20);
  });
};
