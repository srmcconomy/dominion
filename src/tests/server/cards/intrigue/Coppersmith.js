import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Coppersmith'];
  });

  test('copper should produce $2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Coppersmith']);
    await waitForNextInput();
    respondWithCard('Coppersmith');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(2);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('copper should produce $3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Village', 'Coppersmith', 'Coppersmith']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Coppersmith');
    await waitForNextInput();
    respondWithCard('Coppersmith');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(3);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(6);
  });
};
