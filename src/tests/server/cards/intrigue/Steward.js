import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithChoice, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Steward'];
  });

  test('should allow for draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Steward']);
    await waitForNextInput();
    respondWithCard('Steward');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.money).toBe(0);
  });

  test('should allow for money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Steward']);
    await waitForNextInput();
    respondWithCard('Steward');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.money).toBe(2);
  });

  test('should allow for trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Steward']);
    await waitForNextInput();
    respondWithCard('Steward');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.money).toBe(0);
    expect(game.trash.length).toBe(2);
  });
};
