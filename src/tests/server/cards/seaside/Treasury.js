import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, skipToNextTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Treasury'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Treasury']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should go back into hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Estate', 'Estate', 'Treasury']);
    setDeck(player, Array(10).fill('Estate'));
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Treasury').length).toBe(1);
  });

  test('should stack', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Treasury', 'Treasury', 'Treasury']);
    setDeck(player, Array(10).fill('Estate'));
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(3);
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Treasury').length).toBe(3);
  });

  test('should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Treasury', 'Treasury', 'Treasury']);
    setDeck(player, Array(10).fill('Estate'));
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Treasury').length).toBe(0);
  });
  test('should not be topdecked if victory card is bought', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Treasury', 'Treasury', 'Treasury']);
    setDeck(player, Array(10).fill('Estate'));
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithCard('Treasury');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();

    expect(game.currentPlayer).toNotBe(player);
    expect(player.hand.filter(c => c.title === 'Treasury').length).toBe(0);
  });
};
