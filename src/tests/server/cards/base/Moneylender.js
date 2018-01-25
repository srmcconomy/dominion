import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should trash a copper for +$3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Moneylender']);
    await waitForNextInput();
    respondWithCard('Moneylender');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.hand.length).toBe(3);
    expect(game.trash.length).toBe(1);
  });

  test('should do nothing if no Coppers', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Estate', 'Estate', 'Estate', 'Moneylender']);
    await waitForNextInput();
    respondWithCard('Moneylender');
    await waitForNextInput();
    expect(player.money).toBe(0);
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(3);
  });
};
