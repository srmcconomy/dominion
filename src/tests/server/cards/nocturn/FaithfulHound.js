import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithNoCards, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['FaithfulHound'];
  });

  test('should draw 2 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FaithfulHound']);
    await waitForNextInput();
    respondWithCard('FaithfulHound');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
  });

  test('should setaside when discarded', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Cellar', 'FaithfulHound']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards(['FaithfulHound', 'Copper']);
    await waitForNextInput();
    respondWithCard('FaithfulHound');
    await waitForNextInput();
    expect(player.asidePile.last().title).toBe('FaithfulHound');
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.length).toBe(1);
    expect(player.playArea.length).toBe(1);

    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
  });

  test('setaside should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Cellar', 'FaithfulHound']);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards(['FaithfulHound', 'Copper']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.asidePile.length).toBe(0);
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.length).toBe(2);
    expect(player.playArea.length).toBe(1);
  });
};
