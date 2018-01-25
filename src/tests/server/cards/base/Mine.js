import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should upgrade Copper to Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mine']);
    await waitForNextInput();
    respondWithCard('Mine');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(1);
    expect(game.trash.length).toBe(1);
  });

  test('shouldn\'t upgrade Copper to Gold', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mine']);
    await waitForNextInput();
    respondWithCard('Mine');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Gold');
    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(game.trash.length).toBe(1);
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Copper').length).toBe(4);
  });
};
