import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWith } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should give 1 buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BridgeTroll']);
    await waitForNextInput();
    respondWithCard('BridgeTroll');
    await waitForNextInput();

    expect(player.buys).toBe(2);
  });

  test('should give 1 buy at the start of next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BridgeTroll']);

    await waitForNextInput();
    respondWithCard('BridgeTroll');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.buys).toBe(2);
  });

  test('should cause every other player to take their -1 coin token', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BridgeTroll']);

    await waitForNextInput();
    respondWithCard('BridgeTroll');
    await waitForNextInput();

    await skipToNextTurn(otherPlayer);
    setHand(otherPlayer, ['Gold']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();

    expect(otherPlayer.money).toBe(2);
  });

  test('should make cards cost 1 coin less', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BridgeTroll']);
    await waitForNextInput();
    respondWithCard('BridgeTroll');
    await waitForNextInput();
    player.money = 2;
    respondWithCards([]);
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();

    expect(player.discardPile).toHaveSome(c => c.title === 'Silver');
  });

  test('should make cards cost 1 coin less next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BridgeTroll']);
    await waitForNextInput();
    respondWithCard('BridgeTroll');
    await waitForNextInput();

    await skipToNextTurn(player);
    setHand(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();

    expect(player.discardPile).toHaveSome(c => c.title === 'Silver');
  });
};
