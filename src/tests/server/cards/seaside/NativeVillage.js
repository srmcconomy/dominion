import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['NativeVillage'];
  });

  test('should place on mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'NativeVillage']);
    await waitForNextInput();
    respondWithCard('NativeVillage');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(player.mats.nativeVillage.length).toBe(1);
  });

  test('should pickup from mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'NativeVillage', 'NativeVillage']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gold']);
    await waitForNextInput();
    respondWithCard('NativeVillage');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('NativeVillage');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.actions).toBe(3);
    expect(player.mats.nativeVillage.length).toBe(0);
    expect(player.hand.last().title).toBe('Gold');
  });

  test('shouldn\'t fail with empty deck/mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'NativeVillage', 'NativeVillage']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('NativeVillage');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('NativeVillage');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.actions).toBe(3);
    expect(player.mats.nativeVillage.length).toBe(0);
    expect(player.hand.length).toBe(3);
  });

  test('should find at end of game', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'NativeVillage', 'NativeVillage']);
    setDeck(player, ['Province']);
    await waitForNextInput();
    respondWithCard('NativeVillage');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(6);;
  });
};
