import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['ShantyTown'];
  });

  test('should draw with no actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'ShantyTown']);
    await waitForNextInput();
    respondWithCard('ShantyTown');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(2);
  });

  test('shouldn\'t draw with an action card in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'ShantyTown']);
    await waitForNextInput();
    respondWithCard('ShantyTown');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
  });
};
