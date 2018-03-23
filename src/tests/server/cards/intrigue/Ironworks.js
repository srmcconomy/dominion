import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ironworks', 'Island', 'Harem'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Ironworks']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should work on actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironworks']);
    await waitForNextInput();
    respondWithCard('Ironworks');
    await waitForNextInput();
    respondWithSupply('Ironworks');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
    expect(player.discardPile.last().title).toBe('Ironworks');
  });

  test('should work on treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironworks']);
    await waitForNextInput();
    respondWithCard('Ironworks');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.money).toBe(1);
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('should work on Victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironworks']);
    await waitForNextInput();
    respondWithCard('Ironworks');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(0);
    expect(player.money).toBe(0);
    expect(player.discardPile.last().title).toBe('Estate');
  });

  test('should work on Curses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironworks']);
    await waitForNextInput();
    respondWithCard('Ironworks');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.money).toBe(0);
    expect(player.discardPile.last().title).toBe('Curse');
  });

  test('should work on Action/Victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironworks']);
    await waitForNextInput();
    respondWithCard('Ironworks');
    await waitForNextInput();
    respondWithSupply('Island');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
    expect(player.discardPile.last().title).toBe('Island');
  });

  test('should work on Treasure/Victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Village', 'Bridge', 'Bridge', 'Ironworks']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Bridge');
    await waitForNextInput();
    respondWithCard('Bridge');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
    respondWithCard('Ironworks');
    await waitForNextInput();
    respondWithSupply('Harem');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(0);
    expect(player.money).toBe(3);
    expect(player.discardPile.last().title).toBe('Harem');
  });
};
