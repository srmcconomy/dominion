import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Harvest'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Harvest']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give 4 coin with all unique', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harvest']);
    setDeck(player, ['Copper', 'Silver', 'Gold', 'Platinum']);
    await waitForNextInput();
    respondWithCard('Harvest');
    await waitForNextInput();
    expect(player.money).toBe(4);
    expect(player.discardPile.length).toBe(4);
  });

  test('should give less with duplicates', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harvest']);
    setDeck(player, ['Copper', 'Silver', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Harvest');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.discardPile.length).toBe(4);
  });

  test('should give nothing with no deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harvest']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Harvest');
    await waitForNextInput();
    expect(player.money).toBe(0);
    expect(player.discardPile.length).toBe(0);
  });

  test('should take from discard pile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harvest']);
    setDeck(player, ['Estate', 'Estate']);
    setDiscardPile(player, ['Copper', 'Silver', 'Gold', 'Platinum']);
    await waitForNextInput();
    respondWithCard('Harvest');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.discardPile.length).toBe(4);
  });
};
