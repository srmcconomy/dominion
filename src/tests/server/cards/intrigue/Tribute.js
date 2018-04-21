import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Tribute'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Tribute']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('shouldn\'t count duplicates', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tribute']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Tribute');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(2);
  });

  test('should give money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tribute']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Silver', 'Copper']);
    await waitForNextInput();
    respondWithCard('Tribute');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(4);
  });

  test('should consider multiple types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tribute']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Mill', 'Harem']);
    await waitForNextInput();
    respondWithCard('Tribute');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.actions).toBe(2);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(2);
  });

  test('should give actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tribute']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Tribute', 'Silver']);
    await waitForNextInput();
    respondWithCard('Tribute');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(2);
  });
};
