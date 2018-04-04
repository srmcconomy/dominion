import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['PhilosophersStone'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['PhilosophersStone']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('should be worth 1', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PhilosophersStone']);
    await waitForNextInput();
    respondWithCard('PhilosophersStone');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('should be worth 4', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PhilosophersStone']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('PhilosophersStone');
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('should be worth 5', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PhilosophersStone']);
    setDeck(player, Array(13).fill('Copper'));
    setDiscardPile(player, Array(13).fill('Copper'));
    await waitForNextInput();
    respondWithCard('PhilosophersStone');
    await waitForNextInput();
    expect(player.money).toBe(5);
  });
};
