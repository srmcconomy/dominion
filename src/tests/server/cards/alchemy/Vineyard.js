import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Vineyard'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Vineyard']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('Vineyard should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vineyard']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });

  test('Vineyard should be worth 1', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Copper', 'Cellar', 'Copper', 'Vineyard']);
    setDeck(player, ['Copper', 'Transmute', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(1);
  });

  test('Vineyard should be worth 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Chapel', 'Cellar', 'Vineyard', 'Vineyard']);
    setDeck(player, ['GreatHall', 'Transmute', 'Festival', 'Survivors']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(5);
  });
};
