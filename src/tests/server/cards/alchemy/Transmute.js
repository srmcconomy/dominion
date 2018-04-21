import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Transmute'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Transmute']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('should work with action cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'Transmute']);
    await waitForNextInput();
    respondWithCard('Transmute');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Village');
    expect(player.discardPile.last().title).toBe('Duchy');
  });

  test('should work with treasure cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Transmute']);
    await waitForNextInput();
    respondWithCard('Transmute');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Copper');
    expect(player.discardPile.last().title).toBe('Transmute');
  });

  test('should work with victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Transmute']);
    await waitForNextInput();
    respondWithCard('Transmute');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Gold');
  });

  test('should work with Great Hall cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'GreatHall', 'Transmute']);
    await waitForNextInput();
    respondWithCard('Transmute');
    await waitForNextInput();
    respondWithCard('GreatHall');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('GreatHall');
    expect(player.discardPile.some(c => c.title === 'Duchy')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Gold')).toBe(true);
  });

  test('should work with Harem cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Harem', 'Transmute']);
    await waitForNextInput();
    respondWithCard('Transmute');
    await waitForNextInput();
    respondWithCard('Harem');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Harem');
    expect(player.discardPile.some(c => c.title === 'Transmute')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Gold')).toBe(true);
  });
};
