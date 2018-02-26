import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, skipToNextTurn, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Smugglers', 'Village'];
  });

  test('should gain card bought last turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Gold']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Smugglers', 'Copper']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('Duchy');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Duchy')).toBe(true);
    respondWithCard('Smugglers');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Duchy');
  });

  test('shouldn\'t work on province');

  test('should gain card gained last turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Workshop', 'Gold']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Smugglers', 'Copper']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Village');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Village')).toBe(true);
    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    respondWithCard('Smugglers');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Village');
  });

  test('should work with multiple cards gained last turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Workshop', 'Village', 'Workshop']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Smugglers', 'Village', 'Smugglers']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Estate')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Silver')).toBe(true);
    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Smugglers');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Estate');
    respondWithCard('Smugglers');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
  });

  test('shouldn\'t fail if nothing gained', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Smugglers', 'Gold']);
    await waitForNextInput();
    respondWithCard('Smugglers');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.discardPile.length).toBe(0)
  });

  test('shouldn\'t fail on empty pile');

  test('shouldn\'t gain potion cards');
};
