import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ironmonger'];
  });

  test('should be able to discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
    expect(player.discardPile.length).toBe(1);
  });

  test('should be able to leave on top', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
    expect(player.discardPile.length).toBe(0);
  });

  test('should work with treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Silver', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });

  test('should work with actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Village', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.money).toBe(0);
  });

  test('should work with curses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Curse', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
  });

  test('should work with islands', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Island', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(2);
    expect(player.money).toBe(0);
  });

  test('should work with harems', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Harem', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });
};
