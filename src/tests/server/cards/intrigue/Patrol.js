import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Patrol'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Patrol']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw 3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Patrol']);
    setDeck(player, ['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Patrol');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });

  test('should draw victory and curses from top 4', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Patrol']);
    setDeck(player, ['Province', 'Curse', 'Estate', 'Silver', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Patrol');
    await waitForNextInput();
    expect(player.hand.length).toBe(10);
    expect(player.hand.some(c => c.title === 'Estate')).toBe(true);
    expect(player.hand.some(c => c.title === 'Province')).toBe(true);
    expect(player.hand.some(c => c.title === 'Curse')).toBe(true);
  });
};
