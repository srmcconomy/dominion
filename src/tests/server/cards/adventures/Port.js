import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Port'];
  });

  test('should give 1 card and 2 actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Port']);
    await waitForNextInput();
    respondWithCard('Port');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
  });

  test('should give you a Port when you buy it', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    player.money = 4;
    respondWithCards([]);
    await waitForNextInput();
    respondWithSupply('Port');
    await waitForNextInput();

    expect(player.discardPile.length).toBe(7);
    const numPorts = player.discardPile.filter(c => c.title === 'Port').length;
    expect(numPorts).toBe(2);
  });
};
