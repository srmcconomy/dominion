import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Druid'];
  });

  test('should set aside boons for druid', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.boonPile.length).toBe(9);
    expect(game.druidBoons.length).toBe(3);
  });

  test('should give 1 of everything', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Druid']);
    await waitForNextInput();
    respondWithCard('Druid');
    await waitForNextInput();
    expect(player.buys).toBe(2);
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.boonsReceivedThisTurn.length).toBe(1);
  });
};
