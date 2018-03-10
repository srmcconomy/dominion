import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, skipToNextTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Tactician'];
  });

  test('should discard and give mega turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tactician']);
    setDeck(player, Array(10).fill('Copper'));
    await waitForNextInput();
    respondWithCard('Tactician');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.actions).toBe(2);
    expect(player.hand.length).toBe(10);
    expect(player.buys).toBe(2);
  });

  test('shouldn\'t work if nothing to discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Tactician']);
    setDeck(player, Array(10).fill('Copper'));
    await waitForNextInput();
    respondWithCard('Tactician');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
    expect(player.buys).toBe(1);
  });

  test('Should work with Throne Room', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'ThroneRoom', 'Tactician']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('Tactician');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    expect(player.actions).toBe(2);
    expect(player.hand.length).toBe(10);
    expect(player.buys).toBe(2);
  });

  test('Should work twice if throned with the +Card Token');
};
