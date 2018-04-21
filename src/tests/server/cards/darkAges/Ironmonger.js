import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithFirstCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ironmonger'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Ironmonger']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should be able to discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ironmonger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Copper']);
    await waitForNextInput();
    respondWithCard('Ironmonger');
    await waitForNextInput();
    respondWithFirstCard();
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
    respondWithNoCards();
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
    respondWithNoCards();
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
    respondWithNoCards();
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
    respondWithNoCards();
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
    respondWithNoCards();
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
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });
};
