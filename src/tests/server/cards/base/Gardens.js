import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Gardens'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gardens']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Gardens should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gardens']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0); // 9/10 = 0
  });

  test('Gardens should be worth 1', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gardens']);
    setDeck(player, Array(5).fill('Copper'));
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(1); // (5+5)/10 = 1
  });

  test('Gardens should be worth 5', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gardens']);
    setDiscardPile(player, Array(10).fill('Copper'));
    setDeck(player, Array(44).fill('Copper'));
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(5); // (5+10+44)/10 = 5.9 = 5
  });
};
