import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, respondWithCardsFromHand, respondWithChoice, skipToNextTurn, respondWith } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should give 1 card 1 action', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CaravanGuard']);
    await waitForNextInput();
    respondWithCardFromHand('CaravanGuard');
    await waitForNextInput();

    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });

  test('should give 1 coin at the start of next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CaravanGuard']);
    await waitForNextInput();
    respondWithCardFromHand('CaravanGuard');
    await waitForNextInput();
    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.money).toBe(1);
  });

  test('should react to attacks, giving 1 card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);

    await skipToNextTurn(otherPlayer);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CaravanGuard']);
    await waitForNextInput();
    respondWithCardFromHand('Militia');
    const { player: inputPlayer } = await waitForNextInput();
    expect(inputPlayer).toBe(player);
    respondWithFirstCard();
    await waitForNextInput();

    expect(player.hand.length).toBe(5);
    expect(player.playArea.last().title).toBe('CaravanGuard');
  });

  test('should give 1 coin the turn after it reacts to something', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await skipToNextTurn(otherPlayer);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CaravanGuard']);
    await waitForNextInput();
    respondWithCardFromHand('Militia');
    const { player: inputPlayer } = await waitForNextInput();
    expect(inputPlayer).toBe(player);
    respondWithFirstCard();
    await waitForNextInput();
    respondWithCardsFromHand(['Copper', 'Copper']);

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.money).toBe(1);
  });
};
