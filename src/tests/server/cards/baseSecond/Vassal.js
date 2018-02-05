import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should chain Vassals and play Actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vassal']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Smithy', 'Vassal']);
    await waitForNextInput();
    respondWithCard('Vassal');
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.hand.length).toBe(7);
    expect(player.money).toBe(4);
  });
};
