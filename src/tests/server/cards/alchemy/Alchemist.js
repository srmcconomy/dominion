import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithNoCards, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Alchemist'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Alchemist']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('should draw, action, and top deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Potion', 'Alchemist']);
    await waitForNextInput();
    respondWithCard('Alchemist');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    respondWithCard('Potion');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Alchemist');
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'Alchemist')).toBe(true);
  });

  test('should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Potion', 'Alchemist']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('Alchemist');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    respondWithCard('Potion');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'Alchemist')).toBe(false);
  });

  test('shouldn\'t topdeck without potion', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Potion', 'Alchemist']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('Alchemist');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'Alchemist')).toBe(false);
    expect(player.hand.length).toBe(5);
  });
};
