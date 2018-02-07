import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, respondWithChoice, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Butcher', 'ThroneRoom'];
  });

  test('should give tokens an not gain if nothing trashed', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Butcher']);
    await waitForNextInput();
    respondWithCard('Butcher');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.coinTokens).toBe(2);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('should trash and gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Copper', 'Butcher']);
    await waitForNextInput();
    respondWithCard('Butcher');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithSupply('ThroneRoom');
    await waitForNextInput();
    expect(player.coinTokens).toBe(1);
    expect(game.trash.last().title).toBe('Silver');
    expect(player.discardPile.last().title).toBe('ThroneRoom');
  });

  test('should work with potion cost cards?');
};
