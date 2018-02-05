import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Courtier'];
  });

  test('should give money and gold', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Island', 'Courtier']);
    await waitForNextInput();
    respondWithCard('Courtier');
    await waitForNextInput();
    respondWithCard('Island');
    await waitForNextInput();
    respondWithChoice(3);
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.discardPile.last().title).toBe('Gold');
    expect(player.money).toBe(3);
  });

  test('should give action and buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Island', 'Courtier']);
    await waitForNextInput();
    respondWithCard('Courtier');
    await waitForNextInput();
    respondWithCard('Island');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(0);
  });

  test('should love Dame Josephine');

};
